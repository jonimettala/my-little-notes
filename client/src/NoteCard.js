import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core'

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
  timestamps: {
    fontSize: 14,
    marginLeft: 10
  },
  pos: {
    marginBottom: 12
  },
  note: {
    whiteSpace: 'pre-wrap'
  }
})

const NoteCard = ({ note, handleDelete }) => {
  const classes = useStyles()
  // const bull = <span className={classes.bullet}>•</span>

  console.log(note)

  return (
    <Grid container item xs={12} lg={6}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {note.title}
          </Typography>
          <Typography className={classes.note} variant="body2" component="p">
            {note.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container direction='column'>
          <Typography className={classes.timestamps} color="textSecondary" gutterBottom>
              added: {moment(note.added).format('llll')}
              {note.updated !== null ? <><br />modified: {moment(note.updated).format('llll')}</> : <></>}
            </Typography>
          <Grid container>
          <Button component={Link} to={`/note/${note.id}`} size="small">Edit</Button>
          <Button onClick={() => handleDelete(note.id)} size="small">Delete</Button>
          </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default NoteCard
