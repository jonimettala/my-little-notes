import React from 'react'
import { Link, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}))

export default function NavBar ({ showImportantOnly, setShowImportantOnly }) {
  const classes = useStyles()

  const toggleImportant = () => {
    setShowImportantOnly(!showImportantOnly)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography component={Link} to={'/'} color='inherit' variant='h6' className={classes.title}>
            My Little Notes
          </Typography>
          <Route exact path='/'>
            {showImportantOnly
              ? <Button onClick={toggleImportant} color='inherit'>Show Important</Button>
              : <Button onClick={toggleImportant} color='inherit'>Show Everything</Button>}
            <Button component={Link} to={'/add'} color='inherit'>Add Note</Button>
          </Route>
          <Route exact path='/add'>
            <Button component={Link} to={'/'} color='inherit'>Cancel</Button>
          </Route>
        </Toolbar>
      </AppBar>
    </div>
  )
}
