const express = require('express')
const bodyParser = require('body-parser')

const facilityRoutes = require('./routes/facility')
const swaggerDocs = require('./docs/swaggerDocs')

const port = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

facilityRoutes(app)
swaggerDocs(app)

app.listen(port, () => {
    console.log(`backend is listening on port ${port}!`)
})

module.exports = app