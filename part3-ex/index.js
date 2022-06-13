const express = require('express')
const morgan = require('morgan')
const app = express()
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const generateId = () => {
  const maxId = Math.max(...phonebook.map((user) => user.id))
  return maxId + 1
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'missing name or number' })
  }

  if (phonebook.find((user) => user.name === body.name)) {
    return res.status(400).json({ error: 'user already in phonebook' })
  }

  const user = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  phonebook = phonebook.concat(user)
  res.json(user)
})

app.get('/api/persons', (req, res) => {
  res.json(phonebook)
})

app.get('/info', (req, res) => {
  const date = new Date()
  const response = `
<p>Phonebook has info for ${phonebook.length}</p>
<p>${date}</p>
`
  res.send(response)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = phonebook.find((user) => user.id === id)

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  phonebook = phonebook.filter((user) => user.id !== id)

  res.status(204).end()
})