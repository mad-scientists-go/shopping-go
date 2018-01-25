const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
		type: Sequelize.ENUM('pending', 'paid', 'error'),
		defaultValue: 'pending'
	}
})

module.exports = Order
