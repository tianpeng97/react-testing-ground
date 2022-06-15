require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({
      error: 'content missing',
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
  }

  note.save().then((savedNote) => {
    // formatted using toJSON method
    res.json(savedNote)
  })
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})

app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      res.json(note)
    })
    .catch((err) => {
      res.statusMessage = `Resource ${id} was not found in collection.`
      res.status(404).end()
    })
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((note) => note.id !== id)

  res.status(204).end()
})
