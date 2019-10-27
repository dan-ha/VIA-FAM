const Sequelize = require('sequelize')

let connectionString = process.env.CLEARDB_DATABASE_URL || process.env.DATABASE_URL || 'mysql://root:password@localhost/via_fam'
console.log(connectionString)
const sequelize = new Sequelize(connectionString, { logging: console.log })

sequelize.authenticate().then(()=>console.log('connection established sucessfuly')).catch(err=>console.log(err))


module.exports = sequelize
