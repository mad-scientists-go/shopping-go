const Sequelize = require('sequelize')
if (process.env.NODE_ENV !== 'production') require('../../secrets')
const db = new Sequelize(
  process.env.DATABASE_URL,
  {
    logging: false
  }
)
module.exports = db
