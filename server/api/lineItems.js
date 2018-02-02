const router = require('express').Router()
const {LineItem} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => { // order id , product id , quantity.
  console.log("hitting the route for line items")
LineItem
.findOrCreate({
  where: {orderId: req.body.orderId, productId: req.body.productId}
})
.then(([...res])=>{
  if (!created){
    console.log('findOrCreate', req.body)
    //lineItem.qty = lineItem.qty + req.body.qty // updating the quantity
    lineItem.increment('qty', {by: req.body.qty } )
  }
})
.then(order => {
  console.log('ORDER FROM LINE ITEM', order)
  res.json(order)
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
