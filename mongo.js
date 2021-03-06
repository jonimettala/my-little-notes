require('dotenv').config()
const mongoose = require('mongoose')

const PORT = process.env.PORT
const URL = process.env.MONGODB_URI

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
  title: String,
  text: String,
  important: Boolean,
  added: Date,
  updated: Date,
})

const Note = mongoose.model('Note', noteSchema)

if (process.argv.length === 2) {
  Note.find({}).then(result => {
    console.log('Notes:')
    result.forEach(note => {
      console.log(`${note.title} ${note.text}`)
    })
    mongoose.connection.close()
  })

} else if (process.argv.length === 4) {
  const note = new Note({
    title: process.argv[2],
    text: process.argv[3],
    important: false,
    added: Date.now(),
    updated: null,
  })

  note.save().then(result => {
    console.log(`Added ${note.title} : ${note.text}`)
    mongoose.connection.close()
  })
} else {
  console.log('Invalid arguments')
  mongoose.connection.close()
}
