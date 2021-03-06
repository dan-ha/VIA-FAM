const express = require('express')
const port = process.env.PORT || 3001
const data = require('./dummyData.json')

const app = express()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, User-Agent")
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH")
    next();
})

app.get('/authenticate', (req, res) => {
    const user = getUser(req.query.username)
    const authenticated = user ? user.password === req.query.password : false
    res.send({ authenticated })
})

app.get('/user', (req, res) => {
    if(req.query.role) {
        const result = data.filter((d) => d.role === req.query.role)
        res.send(result)
    } else {
        res.status(400).send()
    }
})

app.get('/user/:username', (req, res) => {
    const user = { ...getUser(req.params.username) }
    if (Object.keys(user).length === 0) {
        res.status(404).send()
    } else {
        delete user.password
        res.send(user)
    }
})

function getUser(username) {
    return data.find((d) => d.username == username)
}

app.listen(port, () => console.log(`VIA authentication service(mock) is successfully listening on the port: ${port}`))
module.exports = app