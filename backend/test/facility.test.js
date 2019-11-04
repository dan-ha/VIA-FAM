const should = require('should')
const request = require('supertest')
const app = require('../src/app.js')

const facility = {
  name: 'Library',
  description: 'Book a librarian description',
  openingHours: [],
  emailAddress: 'bookalibrarian@via.dk',
  phoneNo: '+45000000',
  location: 'D.301',
  additionalInfo: 'additional info',
  appointmentManager: false,
  services: [],
  facilitators: []
}

describe('route /facility', async function () {

  before(async () => {
    const sequelize = require('../src/db/sequelize.js')
    await sequelize.sync()
  })

  describe('POST /facility', function () {
    it('should register new facility, and return it with 201', function (done) {
      request(app)
        .post('/facility')
        .set('Accept', 'application/json')
        .send(facility)
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function (err, res) {
          should.not.exist(err)
          should.deepEqual(res.body, facility)
          done()
        })
    })

    it('should reject malformed facility object with 400', function (done) {
      request(app)
        .post('/facility')
        .set('Accept', 'application/json')
        .send({ param1: 'wrong' })
        .expect(400)
        .end(function (err, res) {
          should.not.exist(err)
          done()
        })
    })

    it('should reject already registered facility with 409', function (done) {
      request(app)
        .post('/facility')
        .set('Accept', 'application/json')
        .send(facility)
        .expect(409)
        .end(function (err, res) {
          should.not.exist(err)
          done()
        })
    })
  })

  describe('GET /facility', function () {
    it('should get all registered facilities', function (done) {
      request(app)
        .get('/facility')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err)
          should.deepEqual(res.body[0], facility)
          done()
        })
    })
  })

  describe('GET /facility/:name', function () {
    it('should get already registered facility', function (done) {
      request(app)
        .get(`/facility/${facility.name}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err)
          should.deepEqual(res.body, facility)
          done()
        })
    })
    it('should return 404 for not registered facility', function (done) {
      request(app)
        .get('/facility/NonExisting')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function (err, res) {
          should.not.exist(err)
          done()
        })
    })
  })

  describe('PATCH /facility/:name', function () {
    const description = 'updated description'

    it('should update registered facility', function (done) {
      request(app)
        .patch(`/facility/${facility.name}`)
        .set('Accept', 'application/json')
        .send({description, appointmentManager: true})
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err)
          should.equal(res.body.description, description)
          should.equal(res.body.appointmentManager, true)
          done()
        })
    })
    it('should return 404 for not existing facility', function (done) {
      request(app)
        .get('/facility/NonExisting')
        .set('Accept', 'application/json')
        .send({description, appointmentManager: true})
        .expect(404)
        .end(function (err, res) {
          should.not.exist(err)
          done()
        })
    })
  })

})
