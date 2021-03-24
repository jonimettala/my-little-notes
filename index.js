require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const Note = require('./models/note')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.title === undefined || body.title === '') {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    title: body.title || '',
    content: body.content || '',
    important: body.important || false,
    added: new Date(),
    updated: null
  })

  note.save().then(savedNote => {
    response.status(201)
    response.json(savedNote)
  })
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  if (body.title === undefined) {
    return response.status(400).json({ error: 'Invalid data' })
  }

  const note = {
    title: body.title || '',
    content: body.content || '',
    important: body.important || false,
    updated: new Date()
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Endpoint not found' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'ID not found' })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
