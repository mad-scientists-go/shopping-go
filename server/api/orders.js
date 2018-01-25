const router = require('express').Router()
const {Order, LineItem, Product} = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/user/:userId', (req, res, next) => {
  Order.findAll({
		where: {
			userId: req.params.userId
		}
	})
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Order.findById(req.body.id, {
		include: [
			{
				model: LineItem,
				include: [Product]
			}
		]
	})
    .then(orders => res.json(orders))
    .catch(next)
})

router.post('/', (req, res, next) => {
	Order.create({
		LineItems: [
			{purchasePrice: 0, productId: 1}
		],
		userId: 1
	})
    .then(orders => res.json(orders))
    .catch(next)
})
