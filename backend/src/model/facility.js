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
    },
    appointmentManager: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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

const Service = sequelize.define('services', {
    service: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
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
    },
    studentId: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
})

Facility.hasMany(OpeningHours)
Facility.hasMany(Facilitator)
Facility.hasMany(Service)
Facilitator.hasMany(Appointment)
sequelize.sync()

module.exports = { Facility, OpeningHours, Facilitator, Service, Appointment }
