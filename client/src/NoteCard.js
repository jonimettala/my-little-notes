import React from 'react'
import moment from 'moment'
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
  timestamps: {
    fontSize: 14,
    marginLeft: 10
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
    <Grid container item xs={12} lg={6}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {note.title}
          </Typography>
          <Typography variant="body2" component="p">
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
          <Button size="small">Open</Button>
          <Button size="small">Delete</Button>
          </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default NoteCard
