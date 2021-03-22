import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import './App.css'
import NavBar from './NavBar'
import noteService from './services/notes'
import NoteList from './NoteList'
import EditNote from './EditNote'

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

  return (
    <Router>
      <NavBar />
      <Grid container direction='column'>
        <Grid container>
          <Grid item xs={false} sm={1} md={2} />
          <Grid item container xs={12} sm={10} md={8}>
            <Switch>
            <Route exact path='/'>
                <NoteList notes={notes} handleDelete={handleDelete} />
              </Route>
              <Route exact path='/add'>
                <EditNote notes={notes} setNotes={setNotes} />
              </Route>
              <Route>
                <NoteList notes={notes} important={true} handleDelete={handleDelete} />
              </Route>
            </Switch>
          </Grid>
          <Grid item xs={false} sm={1} md={2} />
        </Grid>
      </Grid>
    </Router>
  )
}

export default App
