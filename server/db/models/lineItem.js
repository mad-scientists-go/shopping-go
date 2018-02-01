const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
	productName: {
		type: Sequelize.STRING
	},
    purchasePrice: {
		type: Sequelize.INTEGER
	},
	qty: {
		type: Sequelize.INTEGER,
		validate: {
			min: 0
		}
	}

})

LineItem.afterCreate((instance, options) => {
	console.log(Sequelize.models)
	console.log(instance)
	console.log('line item order id', instance.orderId)
	Sequelize.Model.Order.upsert({ subtotal: Sequelize.literal('subtotal + 2') }, {
		where: { id: instance.orderId }
	}).then(order => {
		console.log(order)
		return instance //still return the lineitem created, but update the order.
	})
})

module.exports = LineItem

/**
 * instanceMethods
 */
