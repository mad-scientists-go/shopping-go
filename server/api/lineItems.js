const router = require("express").Router();
const { LineItem, Product, Order } = require("../db/models");
const socket = require("../socket");
module.exports = router;

router.post("/", (req, res, next) => {
  // product id , price and quantity.
  const { qty, productId, subject_id } = req.body;
  User.findOne({
    where: {
      subject_id,
      include: [
        {
          model: Order,
          where: {
            status: 'cart'
          }
        }
      ]
    }
  })
    .then(user => {
      
      const orderId = user.dataValues.orders.id
      // const productId = 0
      console.log(orderId, productId, qty, "our original items to post");
      return LineItem.findOrCreate({
        where: {
          orderId,
          productId
        },
        defaults: {
          orderId,
          productId,
          qty
        }
      });
    })
    .then(([lineItem, created]) => {
      console.log(created, "did it create or go ape?");
      if (!created) {
        console.log("findOrCreate", req.body);
        return lineItem
          .update({ qty: req.body.quantity + lineItem.qty })
          .then(() => {
            //if it was updated
            Product.increment("inventory", {
              by: -req.body.quantity,
              where: { id: lineItem.productId }
            });
          });
        //lineItem.quantity = lineItem.quantity + req.body.quantity // updating the quantity
        // lineItem.save()
      }
    })
    .then(() => {
      Order.findById(orderId, { 
        include: [
          {
            model: LineItem,
            include: [Product]
          }
        ]
      })
      .then(order => {
        req.app.io.emit("mobile-cart-update", { data: order });
        res.json(order);
      });
    })
    .catch(next);
});

router.delete("/", (req, res, next) => {
  LineItem.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(item => res.json(item))
    .catch(next);
});
