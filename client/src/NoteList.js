import React, { useEffect, useState } from 'react'

import noteService from './services/notes'
import NoteCard from './NoteCard'

const NoteList = ({ important }) => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [connectionError, setConnectionError] = useState(false)

  const fetchNotes = () => {
    noteService
      .getAll()
      .then(initNotes => {
        setNotes(initNotes)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)

        if (err.response.status === 500) {
          setConnectionError(true)
        }
      })
  }
  useEffect(fetchNotes, [])

  const handleDelete = (id) => {
    const wantsDelete = window.confirm('Are you sure you want to delete the note?')
    if (wantsDelete) {
      noteService
        .remove(id)
        .then(() => {
          const newNotes = notes
          let noteIndex = 0
          for (const note of newNotes) {
            if (note.id === id) {
              newNotes.splice(noteIndex, 1)
            }
            noteIndex++
          }
          setNotes([...newNotes])
        })
        .catch((err) => {
          if (err.response.status === 500) {
            window.alert('Failed to reach the server')
          } else {
            window.alert('The note has been already deleted')
            const newNotes = notes
            let noteIndex = 0
            for (const note of newNotes) {
              if (note.id === id) {
                newNotes.splice(noteIndex, 1)
              }
              noteIndex++
            }
            setNotes([...newNotes])
          }
        })
    }
  }
  if (loading) {
    return <p>Loading</p>
  } else if (connectionError) {
    return <p>Failed to reach the server.</p>
  } else if (notes.length === 0) {
    return <p>There no notes yet!</p>
  } else if (important === true) {
    const notesToShow = notes.filter((note) => note.important === true)
    if (notesToShow.length === 0) {
      return <p>No important notes.</p>
    } else {
      return notesToShow.map((note) => <NoteCard key={note.id} note={note} handleDelete={handleDelete} />)
    }
  } else {
    return notes.map((note) => <NoteCard key={note.id} note={note} handleDelete={handleDelete} />)
  }
}

export default NoteList
