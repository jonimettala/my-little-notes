import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}))

export default function NavBar () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            My Little Notes
          </Typography>
          <Button component={Link} to={'/'} color='inherit'>All Notes</Button>
          <Button component={Link} to={'/important'} color='inherit'>Only Important</Button>
          <Button component={Link} to={'/add'} color='inherit'>Add Note</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
