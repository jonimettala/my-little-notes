import React from 'react'

import NoteCard from './NoteCard'

const NoteList = ({ notes }) => {
  console.log(notes)

  return notes.map((note) => <NoteCard key={note.id} note={note} />)
}

export default NoteList
