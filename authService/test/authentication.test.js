const should = require('should')
const request = require('supertest')
const app = require('../server.js')

const users = require('../dummyData.json')
const user = users[0]

describe('GET /authenticate', function () {

    it('should return true for matching username/password', function (done) {
        request(app)
            .get('/authenticate')
            .query({ username: user.username, password: user.password })
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err)
                should.deepEqual(res.body, { authenticated: true })
                done()
            })
    })

    it('should return false for not matching username/password', function (done) {
        request(app)
            .get('/authenticate')
            .query({ username: user.username, password: 'wrongPassword' })
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err)
                should.deepEqual(res.body, { authenticated: false })
                done()
            })
    })

    it('should return false for non existing username', function (done) {
        request(app)
            .get('/authenticate')
            .query({ username: 'nonExistingUser', password: 'password' })
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err)
                should.deepEqual(res.body, { authenticated: false })
                done()
            })
    })
})

describe('GET /user', function () {

    it('should return user info', function (done) {
        request(app)
            .get(`/user/${user.username}`)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err)
                const userCopy = { ...user }
                delete userCopy.password
                should.deepEqual(res.body, userCopy)
                done()
            })
    })

    it('should return 404 for non-existing user', function (done) {
        request(app)
            .get('/user/nonExistingUser')
            .expect(404)
            .end(function (err, res) {
                should.not.exist(err)
                done()
            })
    })

    it('should returne filtered by role', function (done) {
        request(app)
            .get('/user?role=employee')
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err)
                should.equal(res.body.length, 3)
                done()
            })
    })
})