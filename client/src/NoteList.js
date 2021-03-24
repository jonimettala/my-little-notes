import React, { useEffect, useState } from 'react'

import noteService from './services/notes'
import NoteCard from './NoteCard'

const NoteList = ({ important }) => {
  const [notes, setNotes] = useState([])

  const fetchNotes = () => {
    noteService
      .getAll()
      .then(initNotes => {
        setNotes(initNotes)
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
        .catch(() => {
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
        })
    }
  }

  if (notes.length === 0) {
    return <p>No notes to show.</p>
  } else if (important === true) {
    const notesToShow = notes.filter((note) => note.important === true)
    return notesToShow.map((note) => <NoteCard key={note.id} note={note} handleDelete={handleDelete} />)
  } else {
    return notes.map((note) => <NoteCard key={note.id} note={note} handleDelete={handleDelete} />)
  }
}

export default NoteList
