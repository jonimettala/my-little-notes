import React from 'react'

import NoteCard from './NoteCard'

const NoteList = ({ notes, important, handleDelete }) => {
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
