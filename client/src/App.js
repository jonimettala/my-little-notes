import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'

import './App.css'
import NavBar from './NavBar'
import noteService from './services/notes'
import NoteList from './NoteList'

const App = () => {
  const [notes, setNotes] = useState([])

  const fetchNotes = () => {
    noteService
      .getAll()
      .then(initNotes => {
        setNotes(initNotes)
      })
  }
  useEffect(fetchNotes, [])

  return (
    <>
      <NavBar />
      <Grid container direction='column'>
        <Grid container>
          <Grid item xs={'auto'} sm={1} md={2} />
          <Grid item container xs={12} sm={10} md={8}>
            <NoteList notes={notes} />
          </Grid>
          <Grid item xs={'auto'} sm={1} md={2} />
        </Grid>
      </Grid>
    </>
  )
}

export default App
