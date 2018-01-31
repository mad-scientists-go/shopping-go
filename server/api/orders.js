const router = require('express').Router()
const {User, Order, LineItem, Product} = require('../db/models')



//all orders
router.get('/', (req, res, next) => {
  Order.findAll()
    .then(users => res.json(users))
    .catch(next)
})

//search for orders by search fields
router.post('/', (req, res, next) => {
  Order.findAll({
    where: req.body,
		include: [
			User,
			{
				model: LineItem,
				include: [Product]
			}
		]
  })
    .then(users => res.json(users))
    .catch(next)
})

//completed orderss
router.get('/completed', (req, res, next) => {
  Order.findAll({
    where: {
				status: 'paid'
		},
		include: [
			User,
			{
				model: LineItem,
				include: [Product]
			}
		]
  })
    .then(users => res.json(users))
    .catch(next)
})

//unpaid or pending orders
router.get('/unpaid', (req, res, next) => {
  Order.findAll({
    where: {
				status: 'pending'
		},
		include: [
			User,
			{
				model: LineItem,
				include: [Product]
			}
		]
  })
    .then(users => res.json(users))
    .catch(next)
})

module.exports = router
