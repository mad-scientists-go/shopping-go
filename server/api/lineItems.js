const router = require('express').Router()
const {LineItem} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => { // order id , product id , price and quantity.
LineItem
.findOrCreate({
  where: {orderId: req.body.orderId, productId: req.body.productId}
})
.spread((lineItem, created)=>{
  if(!created){
    console.log('findOrCreate', req.body)
    lineItem.qty = lineItem.qty + req.body.qty // updating the quantity
  }
})
// .then(res=>res.data)
.then(order=> res.json(order))
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
