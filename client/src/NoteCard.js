import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

const NoteCard = ({ note }) => {
  const classes = useStyles()
  // const bull = <span className={classes.bullet}>•</span>

  console.log(note)

  return (
    <Grid container xs={12} lg={5}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            added: {note.added}<br />
            modified: {note.updated}
          </Typography>
          <Typography variant="h5" component="h2">
            {note.title}
          </Typography>
          <Typography variant="body2" component="p">
            {note.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Open</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default NoteCard
