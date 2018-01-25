const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  purchasePrice: {
		type: Sequelize.INTEGER
	},
	qty: {
		type: Sequelize.INTEGER
	}

})

module.exports = LineItem

/**
 * instanceMethods
 */
