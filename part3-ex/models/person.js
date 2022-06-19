const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI)
  .then((res) => {
    console.log(`connected to MongoDB`)
  })
  .catch((err) => {
    console.log(err.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: [true, 'name required'] },
  number: {
    type: String,
    minLength: 8,
    required: [true, 'number required'],
    validate: {
      validator: (v) => /\d{2,3}-\d+/.test(v),
      message: (props) => `${props.value} not valid number`,
    },
  },
})

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
