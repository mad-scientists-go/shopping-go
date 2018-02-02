const User = require('./user')
const Order = require('./order')
const LineItem = require('./LineItem')
const Product = require('./Product')
const Category = require('./Category')
const Sequelize = require('sequelize')


User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(LineItem)
LineItem.belongsTo(Order)
LineItem.belongsTo(Product)
Product.hasMany(LineItem)

Product.belongsTo(Category)
Category.hasMany(Product)


//update order subtotal on lineitem create or delete

LineItem.beforeCreate((instance, options) => {
	console.log(Sequelize.models)
	console.log(instance)
	console.log('line item order id', instance.orderId)
	return Product.findById(instance.productId).then(prod => {
		console.log(prod)
		instance.purchasePrice = prod.price
		prod.inventory = prod.inventory - instance.qty
		return prod.save()
	})
})

LineItem.afterCreate((instance, options) => {
	console.log(instance)
	console.log('line item order id', instance.orderId)
	return Order.increment('subtotal', {
		by: (instance.qty * instance.purchasePrice),
		where: { id: instance.orderId }
	}).then(order => {
		console.log(order)
		//return instance //still return the lineitem created, but update the order.
	})
})

LineItem.afterUpdate((instance, options) => {
	console.log(Sequelize.models)
	console.log(instance)
	console.log('line item order id', instance.orderId)
	return Order.increment('subtotal', {
		by: instance.qty,
		where: { id: instance.orderId }
	})
	.then(order => {
		console.log(order)
		if (instance.qty < 1) {
			return instance.destroy() //wipe lineitem if qty changed to 0
		} else {
			return false
		}
		//return instance //still return the lineitem created, but update the order.
	})
	.then((destroyed) => {
		console.log(destroyed)
		//reupdate prod inventory based on line item qty
		return Product.increment({ inventory: instance.qty })
	})
	.then(prod => {
		//delete after working..
		console.log(prod)
		return prod
	})
})

module.exports = {
  User,
	Order,
	LineItem,
	Product,
	Category
}
