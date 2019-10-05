const sequelize = require('../db/sequelize.js')
const Sequelize = require('sequelize')

const Facility = sequelize.define('facility', {
    name: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneNo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    additionalInfo: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
        timestamps: false,
    })

const OpeningHours = sequelize.define('openingHours', {
    dayOfWeek: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    timeOpen: {
        type: Sequelize.TIME,
        allowNull: false
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
        timestamps: false,
    })

Facility.hasMany(OpeningHours)
sequelize.sync()

module.exports = { Facility, OpeningHours }