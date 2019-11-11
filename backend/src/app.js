const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const facilityRouter = require('./routes/facility.js')
const appointmentRouter = require('./routes/appointment.js')
const swaggerDocs = require('./docs/swaggerDocs')

const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/facility', facilityRouter)
app.use('/appointment', appointmentRouter)
swaggerDocs(app)

app.listen(port, () => {
    console.log(`backend is listening on port ${port}!`)
})

module.exports = app