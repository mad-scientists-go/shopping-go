const User = require('./user')
const Order = require('./order')
const LineItem = require('./LineItem')
const Product = require('./Product')
const Category = require('./Category')
const Sequelize = require('sequelize')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(LineItem)
LineItem.belongsTo(Order)
LineItem.belongsTo(Product)
Product.hasMany(LineItem)

Product.belongsTo(Category)
Category.hasMany(Product)


//update order total on lineitem create or delete


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
	Order,
	LineItem,
	Product,
	Category
}
