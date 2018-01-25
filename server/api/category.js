const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(category => res.json(category))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Category.create(req.body)
    .then(product => res.json(product))
    .catch(next)
})
