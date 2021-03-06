import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import './App.css'
import NavBar from './NavBar'
import NoteList from './NoteList'
import EditNote from './EditNote'

const App = () => {
  const [showImportantOnly, setShowImportantOnly] = useState(false)

  return (
    <Router>
      <NavBar showImportantOnly={showImportantOnly} setShowImportantOnly={setShowImportantOnly} />
      <Grid container direction='column'>
        <Grid container>
          <Grid item xs={false} sm={1} md={2} />
          <Grid item container xs={12} sm={10} md={8}>
            <Switch>
            <Route exact path='/'>
                <NoteList important={showImportantOnly} />
              </Route>
              <Route exact path='/add'>
                <EditNote editing={false} />
              </Route>
              <Route exact path='/note/:id'>
                <EditNote editing={true}/>
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
