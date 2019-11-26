const express = require('express')
const { Appointment } = require('../model/facility.js')

const router = express.Router()

/**
 * @swagger
 *
 *  /appointment:
 *  post:
 *    description: Create a new appointment between specfied facilitator and student
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: body
 *        description: Appointment object that will be created
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Appointment'
 *    responses:
 *      '201':
 *        description: Appointment has been created successfully
 *        schema:
 *          $ref: '#/definitions/Appointment'
 *      '400':
 *        description: Bad request
 */
router.post('/', async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body)
    res.status(201)
    res.send(appointment)
  } catch (e) {
    res.status(400)
    res.send(e)
  }
})

/**
 * @swagger
 * /appointment:
 *  get:
 *    description: Get registered appointments, filtered by query params
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: facilitator
 *        schema:
 *          type: string
 *        description: facilitator id/username 
 *      - in: query
 *        name: student
 *        schema:
 *          type: string
 *        description: student id/username        
 *    responses:
 *      '200':
 *        description: A successful response
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/Appointment'
 */
router.get('/', async (req, res) => {
  const where = {
    ...(req.query.facilitator && { facilitatorEmployeeId: req.query.facilitator }),
    ...(req.query.student && { studentId: req.query.student })
  }
  const appointments = await Appointment.findAll({ where })
  res.send(appointments)
})

/**
 * @swagger
 * /appointment/{id}:
 *  get:
 *    description: Get appointment with the given id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: The appointment ID
 *    responses:
 *      '200':
 *        description: successful operation
 *        schema:
 *          $ref: '#/definitions/Appointment'
 *      '404':
 *        description: Appointment with the given id was not found
 */
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const appointment = await Appointment.findByPk(id)
  if(appointment) {
    res.send(appointment)
  } else {
    res.status(404)
    res.send()
  }
})

/**
 * @swagger
 * /appointment/{id}:
 *  delete:
 *    description: Delete appointment with given id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The appointment id
 *    responses:
 *      '200':
 *        description: successful operation
 *        schema:
 *          $ref: '#/definitions/Appointment'
 *      '404':
 *        description: Appointment with the given id was not found
 */
router.delete('/:id', (req, res) => {
  let { id } = req.params
  Appointment.findByPk(id).then((appointment) => {
    if (appointment) {
      let appointmentString = JSON.stringify(appointment)
      appointment.destroy({ force:true })
      res.status(200).json(JSON.parse(appointmentString))
    } else {
      res.status(404).send()
    }
  })
})

/**
 * @swagger
 *
 *  definitions:
 *      Appointment:
 *          type: object
 *          required:
 *          - date
 *          - location
 *          - subject
 *          - description
 *          - studentId
 *          - facilitatorEmployeeId
 *          properties:
 *              date:
 *                  type: string
 *              location:
 *                  type: string
 *              subject:
 *                  type: string
 *              description:
 *                  type: string
 *              document:
 *                  type: string
 *              studentId:
 *                  type: string
 *              facilitatorEmployeeId:
 *                  type: string
 */

module.exports = router