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
LineItem.afterCreate((instance, options) => {
	console.log(Sequelize.models)
	console.log(instance)
	console.log('line item order id', instance.orderId)
	Order.increment('subtotal', {
		by: instance.qty,
		where: { id: instance.orderId }
	}).then(order => {
		console.log(order)
		return instance //still return the lineitem created, but update the order.
	})
})

LineItem.afterUpdate((instance, options) => {
	console.log(Sequelize.models)
	console.log(instance)
	console.log('line item order id', instance.orderId)
	Order.decrement('subtotal', {
		by: instance.qty,
		where: { id: instance.orderId }
	}).then(order => {
		console.log(order)
		return instance //still return the lineitem created, but update the order.
	})
})


LineItem.afterDelete((instance, options) => {
	console.log(Sequelize.models)
	console.log(instance)
	console.log('line item order id', instance.orderId)
	Order.increment('subtotal', {
		by: instance.qty,
		where: { id: instance.orderId }
	}).then(order => {
		console.log(order)
		return instance //still return the lineitem created, but update the order.
	})
})

module.exports = {
  User,
	Order,
	LineItem,
	Product,
	Category
}
