const router = require('express').Router()
const nodemailer = require('nodemailer')
const { User, Order, LineItem, Product } = require('../db/models')
if (process.env.NODE_ENV !== 'production') require('../../secrets');
const stripe = require('stripe')(process.env.STRIPE_KEY);
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

router.post('/face-auth/walk-in', (req, res, next) => { //return object with user and {user id, status=cart}
  console.log('got here')  
  let foundUser = null
  let newOrder = null
  User.findOne({
    where: {
      subject_id: req.body.subject_id
    }
  })
  .then(userData => {

		if (userData) {
      console.log('userdata from db..',userData)
			foundUser = userData.dataValues
			return Order.create({ userId: foundUser.id })
		} else {
			console.log('error return something..')
			//res.json()
		}
  })
  .then((order) => {
    newOrder = order.dataValues
    return Order.findAll({ where: { userId: foundUser.id, $or: [{status: 'pending'}, {status: 'paid'}] } })
  })
	.then(orderData => {
    res.json({ user: foundUser, order: orderData.dataValues })
    req.app.io.emit('new-instore-user', { user: foundUser, order: orderData.dataValues })
    req.app.io.emit(`new-instore-user-${foundUser.id}`, { user: foundUser, order: newOrder })
  })
  .catch(err => console.log(err))
})

router.post('/face-auth/walk-out', (req, res, next) => {
  User.findOne({
    where: {
      subject_id: req.body.subject_id
    }
  })
  .then(data => {
    return Order.findOne({
      where: {
        status: 'cart',
        userId: data.dataValues.id
      },
      include:[
        User,
        {
          model: LineItem,
          as: 'lineItems',
          include: [Product]
        },
      ]
    })
    .then(order => {
      return stripe.customers.create({
        email: order.user.email
      })
      .then(function(customer){
        return stripe.customers.createSource(customer.id, {
          source: 'tok_visa'
        });
      })
      .then(function(source) {
        return stripe.charges.create({
          amount: order.subtotal * 100,
          currency: 'usd',
          customer: source.customer
        });
      })
      .then(function(charge) {
          console.log('charge created', charge)
         return order.update({ status: 'pending' })
      })
      .then(order => {
        sendEmail(order)
        console.log(order)
        res.json(order.user)
        req.app.io.emit(`walkout-instore-user`, { user: order.user, order })
        req.app.io.emit(`walkout-instore-user-${order.user.id}`, { user: order.user, order })
      })
      .catch(function(err) {
        console.log(err)
      })
      
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
 res.json(req.user || null) 
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

router.post('/adminLogin', (req, res, next) => {
  console.log(req.body, 'login admin')
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if(user.isAdmin) {
        req.login(user, err => (err ? next(err) : res.json(user)))
      } else {
        res.sendStatus(401)
      }
    })
    .catch(next)
})
router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/login-mobile', (req, res, next) => {
  User.findOne({where: {email: req.body.email}
  , include: [{model: Order,
      include: [
        {
          model: LineItem,
          as: 'lineItems',
          include: [Product]
        }
      ]
  }]
    })
  .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else {
        res.json(user)
      }
    })
    .catch(next)
  })
router.post('/sendDispute', (req, res, next) => {
    User.findOne({where: {isAdmin: true}})
    .then(adminUser => {
      sendDisputeEmail(req.body.fromEmail, adminUser.email, req.body.disputeMessage, req.body.orderInfo)
    })
})
const sendEmail = (order) => {
    console.log('intended order obj', order.dataValues.lineItems)
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail', // true for 465, false for other ports
      auth: {
          user: 'disputefromsmartmartcustomer@gmail.com', // generated ethereal user
          pass: 'abcdefg12345'  // generated ethereal password
      }
    })
    let tblRows = order.dataValues.lineItems.map((item, finalStr) => {
      // return item.getParent()
      return finalStr + `<tr><td>${item.product.name}</td><td>${item.qty}</td><td>$ ${item.purchasePrice} each</td></tr>`
    }, '')

    let tbl = '<table><th>product</th><th>qty</th><th>price</th>' + tblRows + '</table>' + '<br />' + '<br />' + '<br />' + 'Subtotal: ' + '$ ' + order.dataValues.subtotal + '<br />' + 'tax: ' + '$ ' + (Number(order.dataValues.subtotal) * 0.07).toString().slice(0, 4) + '<br />' + 'Total: ' + '$ ' + ((Number(order.dataValues.subtotal) * 0.07) + Number(order.dataValues.subtotal))
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'orders@smartmart.com', // sender address
        to: order.dataValues.user.email, // list of receivers
        subject: 'Your Order ✔ Thank you for your purchase!', // Subject line
        html: tbl // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    })
}

const sendDisputeEmail = (from, to, message, order) => {
  let createdHtmlObject = `${from} would like to dispute order number ${JSON.parse(order)['id']}<br /><br /><br /> ${message}`
  console.log('fromtomessageorder', from, to, message, order)
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      service: 'gmail', // true for 465, false for other ports
      auth: {
          user: 'disputefromsmartmartcustomer@gmail.com', // generated ethereal user
          pass: 'abcdefg12345'  // generated ethereal password
      }
  })
  let fakeHtml = '<h1>BOBBY DAMN IT</h1>'
  // setup email data with unicode symbols
  let mailOptions = {
      from: from, // sender address
      to: to, // list of receivers
      subject: `dispute from ${from}`,
      text: message, // plain text body
      html: createdHtmlObject // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  })
}

router.use('/google', require('./google'))
