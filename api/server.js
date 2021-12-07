
// Server Variables
const express = require("express")

const carsRouter = require('./cars/cars-router')

const server = express()

// Use Server
server.use(express.json())

server.use('/', carsRouter)

server.use('*', (req, res, next) => {
    next({
        status: 404,
        message: 'not found'
    })
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

// Exports
module.exports = server
