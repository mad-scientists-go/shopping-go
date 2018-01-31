const router = require('express').Router()
const {LineItem} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => { // order id , product id , price and quantity.
  LineItem.create(req.body)
    .then(item => res.json(item))
    .catch(next)
})

// put to line item
router.delete('/', (req, res, next) => {
  LineItem.destroy({
		where: {
			id: req.body.id
		}
	})
    .then(item => res.json(item))
    .catch(next)
})
