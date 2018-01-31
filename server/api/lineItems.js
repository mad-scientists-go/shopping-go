const router = require('express').Router()
const {LineItem} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  LineItem.create(req.body)
    .then(item => res.json(item))
    .catch(next)
})

router.delete('/', (req, res, next) => {
  LineItem.destroy({
		where: {
			id: req.body.id
		}
	})
    .then(item => res.json(item))
    .catch(next)
})
