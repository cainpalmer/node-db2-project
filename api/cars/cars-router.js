
// Router Variables
const router = require('express').Router()
const Car = require('./cars-model')
const {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid} = require('./cars-middleware')

// Router Requests
router.get('/', async (req, res, next) => {
    try {
        const cars = await Car.getAll()
        res.status(200).json(cars)
    } catch(error) {
        next(error)
    }
})

router.get('/:id', checkCarId, async (req, res, next) => {
    res.json(req.car)
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
    try {
        const car = await Car.create(req.body)
        res.status(201).json(car)
    } catch (error) {
        next(error)
    }
})

// Exports
module.exports = router