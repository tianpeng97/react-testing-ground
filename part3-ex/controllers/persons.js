const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.post('/', (req, res, next) => {
  const { name, number } = req.body

  // new person
  const person = new Person({
    name: name,
    number: number,
  })

  person
    .save()
    .then((saved) => {
      res.json(saved)
    })
    .catch((error) => next(error))
})

personsRouter.get('/', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((error) => next(error))
})

personsRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

personsRouter.put('/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((person) => {
      res.json(person)
    })
    .catch((error) => {
      console.log('no number')
      return next(error)
    })
})

personsRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

module.exports = personsRouter
