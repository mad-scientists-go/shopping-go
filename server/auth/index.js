const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
module.exports = router

router.post('/signup-image', (req, res, next) => {
  console.log('made it to sign-up', req.body)
  User.create(req.body)
    .then(user => {
      console.log('USER', user)
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err => console.log('this is it', err))
      }
    })
})

router.post('/face-auth/walk-in', (req, res, next) => {
	let foundUser = null
  User.findOne({
    where: {
      subject_id: req.body.subject_id
    }
  })
  .then(userData => {
		if (userData.dataValues) {
			foundUser = userData.dataValues
			return Order.create({ userId: foundUser.id })
		} else {
			console.log('error return something..')
			//res.json()
		}
	})
	.then(orderData => res.json({ user: foundUser, order: orderData.dataValues }))
  .catch(err => console.log(err))
})

router.post('/face-auth/walk-out', (req, res, next) => {
  User.findOne({
    where: {
      subject_id: req.body.subject_id
    }
  })
  .then(data => {
		Order.update({ status: 'pending'}, {
			where: {
				userId: data.dataValues.id
			}
		})
	})
  .catch(err => console.log(err))
})


//mobile app routes....
router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/login', (req, res, next) => {
  console.log(req.body, 'login admin')
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else if(user.isAdmin) {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.use('/google', require('./google'))
