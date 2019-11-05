const Sequelize = require('sequelize')

let connectionString = process.env.CLEARDB_DATABASE_URL || process.env.DATABASE_URL || 'mysql://root:password@localhost/via_fam'
let logging = process.env.LOGGING ? JSON.parse(process.env.LOGGING) : false
const sequelize = new Sequelize(connectionString, { logging })

module.exports = sequelize
