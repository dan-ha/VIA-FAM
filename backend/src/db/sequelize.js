const Sequelize = require('sequelize')

let connectionString = process.env.CLEARDB_DATABASE_URL || process.env.DATABASE_URL || 'mysql://root:password@localhost/via_fam'
const sequelize = new Sequelize(connectionString, { logging: false })


module.exports = sequelize
