const router = require('express').Router()
const {LineItem, Product, Order} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => { // order id , product id , price and quantity.
  const { orderId, productId, productName,  qty } = req.body
  LineItem
  .findOrCreate({
    where: {
      orderId,
      productId
    }, defaults: {
      orderId,
      productId,
      productName,
      qty
    }
  })
  .then(([lineItem, created]) => {
    if (!created){
      console.log('findOrCreate', req.body)
      return lineItem.update({ qty: req.body.qty + lineItem.qty })
      .then(() => {
        //if it was updated
        Product.increment('inventory', { by: -req.body.qty, where: { id: lineItem.productId } })
      })
      //lineItem.qty = lineItem.qty + req.body.qty // updating the quantity
      // lineItem.save()
    }
  })
  // .then(res=>res.data)
  .then(() => {
    Order.findById(orderId).then(order => res.json(order))
  })
  .catch(next)
    // .create(req.body)
    // .then(item => res.json(item))
    // .catch(next)
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
