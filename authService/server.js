const express = require('express')
const bodyParser = require('body-parser')
const PORT = 3001
const data = require('./dummyData.json')

const app = express()
app.use(bodyParser.json())

app.get('/authenticate', (req, res) => {
    const user = getUser(req.body.username)
    const authenticated = user ? user.password === req.body.password : false
    res.send({ authenticated })
})

app.get('/user/:username', (req, res) => {
    const user = { ...getUser(req.params.username) }
    if(Object.keys(user).length === 0) {
        res.status(404).send()
    } else {
        delete user.password
        res.send(user)
    }
})

function getUser(username) {
    return data.find((d) => d.username == username)
}

app.listen(PORT, () => console.log(`VIA authentication service(mock) is successfully listening on the port: ${PORT}`))