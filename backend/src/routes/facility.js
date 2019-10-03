const memoryStorage = require('../data/memoryStorage')()

const setUpRoutes = (app) => {
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
  app.post('/facility', (req, res) => {
    // validate the body object
    if(!req.body.name) {
      res.status(400).send()
      return
    }

    if (memoryStorage.save(req.body)) {
      res.status(201).send(memoryStorage.find(req.body.name))
    } else {
      res.status(409).send()
    }
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
  app.get('/facility', (req, res) => {
    res.send(memoryStorage.getAll())
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
   *        description: facility with the given name was not found
   */
  app.get('/facility/:name', (req, res) => {
    let facility = memoryStorage.find(req.params.name)
    if (facility) {
      res.status(200).send(facility)
    } else {
      res.status(404).send()
    }
  })
}

/**
 * @swagger
 *
 *  definitions:
 *      Facility:
 *          type: object
 *          required:
 *          - name
 *          - description
 *          properties:
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              openingHours:
 *                  type: array
 *                  items:
 *                      $ref: '#/definitions/WorkingDay'
 *              emailAddress:
 *                  type: string
 *              phoneNo:
 *                  type: string
 *              location:
 *                  type: string
 *              additionalInfo:
 *                  type: string
 * 
 *      WorkingDay:
 *          type: object
 *          required:
 *          - dayName
 *          - from
 *          - to
 *          properties:
 *              dayName:
 *                  type: string
 *              from:
 *                  type: string
 *              to:
 *                  type: string
 */

module.exports = setUpRoutes