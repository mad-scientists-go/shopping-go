const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
		type: Sequelize.ENUM,
		values: ['cart', 'pending', 'paid'],
		defaultValue: 'cart'
	}
})

module.exports = Order
