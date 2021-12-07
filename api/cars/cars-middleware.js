
// Middleware Variables
const Car = require('./cars-model')
const vin = require('vin-validator')

// Middlewares
const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id)
    if (!car) {
      next({status: 404, message: 'failed to retrieve'})
    } else {
      req.car = car
      next()
    }
  } catch(error) {
    next(error)
  }
}

const checkCarPayload = (req, res, next) => {
  if (!req.body.vin) return next({
    status: 400,
    message: 'missing vin'
  })
  if (!req.body.make) return next({
    status: 400,
    message: 'missing make'
  })
  if (!req.body.model) return next({
    status: 400,
    message: 'missing model'
  })
  if (!req.body.mileage) return next({
    status: 400,
    message: 'missing mileage'
  })
  next()
}

const checkVinNumberValid = async (req, res, next) => {
  if (vin.validate(req.body.vin)) {
    next()
  } else {
    next({
      status: 400,
      message: 'vin is invalid'
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const exists = await Cars.getByVin(req.body.vin)
    if (!exists) {
      next()
    } else {
      next({
        status: 400,
        message: 'vin already exists'
      })
    }
  } catch(err) {
    next(err)
  }
}

// Exports
module.exports = {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid}
