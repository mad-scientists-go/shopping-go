const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Product.findAll({
		where: {
			userId: req.params.userId
		}
	})
    .then(orders => res.json(orders))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.json(product))
    .catch(next)
})
