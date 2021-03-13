const mongoose = require('mongoose')

const URL = process.env.MONGODB_URI

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('MongoDB connection established')
  })
  .catch((error) => {
    console.log('Failed to connect MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  important: Boolean,
  added: Date,
  updated: Date
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
