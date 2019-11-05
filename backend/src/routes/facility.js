const express = require('express')
const { Facility, OpeningHours, Facilitator, Service } = require('../model/facility.js')
const sequelize = require('../db/sequelize.js')

const router = express.Router();

/**
 * @swagger
 *
 *  /facility:
 *  post:
 *    description: Register a new facility in the system
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: body
 *        description: Facility object that will be registered in the system
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Facility'
 *    responses:
 *      '201':
 *        description: Facility has been successfully registered
 *        schema:
 *          $ref: '#/definitions/Facility'
 *      '400':
 *        description: Bad request
 *      '409':
 *        description: Facility with the given name is already registered in the system
 */
router.post('/', (req, res) => {
  sequelize.transaction(transaction => {
    return Facility.create(req.body, { include: [OpeningHours, Facilitator, Service], transaction })
  }).then((facility) => {
    return res.status(201).json(facility)
  }).catch(error => {
    switch (error.name) {
      case 'SequelizeValidationError': {
        res.status(400)
        break
      }
      case 'SequelizeUniqueConstraintError': {
        res.status(409)
        break
      }
      default: {
        res.status(500)
        break
      }
    }
    res.send(error)
    //res.send(error.errors.map(err => err.message))
  })
})

/**
 * @swagger
 * /facility:
 *  get:
 *    description: Get all registered facilities in the system
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: A successful response
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/Facility'
 */
router.get('/', (req, res) => {
  Facility.findAll({ include: [OpeningHours, Facilitator, Service] }).then((facilities) => {
    res.json(facilities)
  })
})

/**
 * @swagger
 * /facility/{name}:
 *  get:
 *    description: Get facility with the given name
 *    responses:
 *      '200':
 *        description: successful operation
 *        schema:
 *          $ref: '#/definitions/Facility'
 *      '404':
 *        description: Facility with the given name was not found
 */
router.get('/:name', (req, res) => {
  let { name } = req.params
  Facility.findByPk(name, { include: [OpeningHours, Facilitator, Service] }).then((facility) => {
    if (facility) {
      res.status(200).json(facility)
    } else {
      res.status(404).send()
    }
  })
})

/**
 * @swagger
 *
 *  /facility/{name}:
 *  patch:
 *    description: Update facility with the given name
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: body
 *        description: Updated version of the facility
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Facility'
 *    responses:
 *      '200':
 *        description: Facility has been successfully updated
 *        schema:
 *          $ref: '#/definitions/Facility'
 *      '404':
 *        description: Facility not found
 *      '500':
 *        description: Internal server error
 */
router.patch('/:name', async (req, res) => {
  try {
    let facility = await Facility.findByPk(req.params.name, { include: [OpeningHours, Facilitator, Service] })
    if (facility) {
      await sequelize.transaction(transaction => {
        if(req.body.name) delete req.body.name
        return Facility.update(req.body, { where: { name: req.params.name } }, transaction)
          .then(transaction => {
            if (req.body.facilitators) {
              return Facilitator.bulkCreate(req.body.facilitators, transaction)
                .then(transaction => {
                  if(req.body.services) {
                    return Service.bulkCreate(req.body.services, transaction)
                  }
                })
            }
          })
      })
      await facility.reload()
      res.send(facility)
    } else {
      res.status(404)
      res.send()
    }
  } catch (error) {
    res.status(500)
    res.send(error)
  }
})


/**
 * @swagger
 *
 *  definitions:
 *      Facility:
 *          type: object
 *          required:
 *          - name
 *          - description
 *          - emailAddress
 *          - phoneNo
 *          - location
 *          properties:
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              openingHours:
 *                  type: array
 *                  items:
 *                      $ref: '#/definitions/OpeningHours'
 *              emailAddress:
 *                  type: string
 *              phoneNo:
 *                  type: string
 *              location:
 *                  type: string
 *              additionalInfo:
 *                  type: string
 * 
 *      OpeningHours:
 *          type: object
 *          required:
 *          - dayOfWeek
 *          - timeOpen
 *          - duration
 *          properties:
 *              dayOfWeek:
 *                  type: integer
 *                  description: values from 1 to 7
 *              timeOpen:
 *                  type: string
 *                  description: hh:mm:ss
 *              duration:
 *                  type: integer
 */

module.exports = router