
// Model Variables
const db = require('../../data/db-config')

// Model Actions
const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('id', id).first()
}

const getByVin = (vin) => {
  return db('cars').where('vin', vin).first()
}

const create = () => {
  return db('cars').insert(car).then(([id]) => {
    return getById(id)
  })
}

// Exports
module.exports = {getAll, getById, getByVin, create}
