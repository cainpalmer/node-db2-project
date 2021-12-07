
// Server Variables
const express = require("express")

const carsRouter = require('./cars/cars-router')

const server = express()

// Use Server
server.use(express.json())

server.use('/', carsRouter)

// Exports
module.exports = server
