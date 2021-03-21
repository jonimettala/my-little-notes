import React from 'react'

import NoteCard from './NoteCard'

const NoteList = ({ notes }) => {
  if (notes.length > 0) {
    return notes.map((note) => <NoteCard key={note.id} note={note} />)
  } else {
    return <p>No notes to show.</p>
  }
}

export default NoteList
