const should = require('should')
const request = require('supertest')
const app = require('../src/app.js')


const appointment = {
    date: new Date(2019, 11, 12, 8, 0, 0).toISOString(),
    location: 'd.301',
    subject: 'ECTS',
    description: 'Transfer of ECTS from another university',
    studentId: '239857',
    facilitatorEmployeeId: 'facilitator'
}

let createdId = undefined

describe('routes /appointment', function () {

    describe('POST /appointment', function () {
        it('should create new appointment, and return it with 201', function (done) {
            request(app)
                .post('/appointment')
                .set('Accept', 'application/json')
                .send(appointment)
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    should.not.exist(err)
                    createdId = res.body.id
                    delete res.body.id
                    should.deepEqual(res.body, appointment)
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
    })

        describe('GET /appointment?facilitator=<fac>&student=<stu>', function () {
            it('should get appointment array filtered based on specified facilitator and student', function (done) {
                request(app)
                    .get('/appointment/')
                    .query({ facilitator: appointment.facilitatorEmployeeId, student: appointment.studentId })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err)
                        // res.body.should.containEql(appointment);
                        done()
                    })
            })
            it('should return empty array for non existing appointments', function (done) {
                request(app)
                    .get('/appointment/')
                    .query({ facilitator: 'non-existing', student: 'non-existing' })
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err)
                        should.deepEqual(res.body, [])
                        done()
                    })
            })
        })

        describe('GET /appointment', function () {
            it('should get specified appointment', function (done) {
                request(app)
                    .get(`/appointment/${createdId}`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err)
                        delete res.body.id
                        delete res.body.document
                        should.deepEqual(res.body, appointment)
                        done()
                    })
            })
        })

})
