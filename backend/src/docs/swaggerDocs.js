const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    definition: {
        info: {
            title: "VIA-FAM backend",
            description: "This is a backend of VIA-FAM system",
            servers: [`http://localhost:3000`]
        },
    },
    apis: ["./src/routes/*.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)

const setUpSwaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

module.exports = setUpSwaggerDocs