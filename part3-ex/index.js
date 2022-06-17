require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ')
  })
)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'missing name or number' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((saved) => {
    res.json(saved)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

// TODO
app.get('/info', (req, res) => {
  const date = new Date()
  const response = `
<p>Phonebook has info for ${phonebook.length}</p>
<p>${date}</p>
`
  res.send(response)
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person)
    })
    .catch((error) => {
      res.status(404).end()
    })
})

// TODO
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  phonebook = phonebook.filter((user) => user.id !== id)

  res.status(204).end()
})
