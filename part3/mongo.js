const mongoose = require('mongoose')
require('dotenv').config()
const password = process.env.PASSWORD

const url = `mongodb+srv://tian:${password}@cluster0.c46wd.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const note = new Note({
      content: 'GET and POST are the most important methods of HTTP protocol',
      date: new Date(),
      important: true,
    })

    return note.save()
  })
  .then(() => {
    console.log('note saved')
    return mongoose.connection.close()
  })
  .catch((error) => console.log(error))
