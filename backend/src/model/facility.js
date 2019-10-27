const sequelize = require('../db/sequelize.js')
const Sequelize = require('sequelize')

const Facility = sequelize.define('facilities', {
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

const Facilitator = sequelize.define('facilitators', {
    employeeId: {
        type: Sequelize.STRING,
        primaryKey: true
    }
}, {
    timestamps: false,
})

const Appointment = sequelize.define('appointments', {
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: true
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    document: {
        type: Sequelize.BLOB,
        allowNull: true
    }
}, {
    timestamps: false,
})

const UnavailableHours = sequelize.define('unavailableHours', {
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
})

const Calendar = sequelize.define('calendar', {

    calendarInfo: {
        type: Sequelize.STRING,
        primaryKey: true
    }
},{
    timestamps: false,
})



Facility.hasMany(OpeningHours)
Facility.hasMany(Facilitator)
Facilitator.hasMany(Appointment)
Facilitator.hasMany(UnavailableHours)
sequelize.sync()


module.exports = { Facility, OpeningHours }
