import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import './App.css'
import NavBar from './NavBar'
import noteService from './services/notes'
import NoteList from './NoteList'
import AddNote from './AddNote'

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
    <Router>
      <NavBar />
      <Grid container direction='column'>
        <Grid container>
          <Grid item xs={false} sm={1} md={2} />
          <Grid item container xs={12} sm={10} md={8}>
            <Switch>
            <Route exact path='/'>
                <NoteList notes={notes} />
              </Route>
              <Route exact path='/add'>
                <AddNote />
              </Route>
              <Route>
                <NoteList notes={notes} important={true} />
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
