const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

//admin get all orders
router.get('/', (req, res, next) => {
  Order.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(orders => res.json(orders))
    .catch(next)
})

//create new order for cart on login
router.post('/', (req, res, next) => {
    Order.create(req.body)
      .then(orders => res.json(orders))
      .catch(next)
  })

//pending
router.put('/checkout/user', (req, res, next) => {
    Order.update({
        status: 'pending'
    }, {
      where: {
          id: req.body.id
      },
      attributes: ['id', 'email']
    })
      .then(orders => res.json(orders))
      .catch(next)
  })

  //charge
  router.put('/pay/user', (req, res, next) => {
    Order.update({
        status: 'paid'
    }, {
      where: {
          id: req.body.id
      },
      attributes: ['id', 'email']
    })
      .then(orders => res.json(orders))
      .catch(next)
  })