import React, { useState } from 'react'
import { makeStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'

import noteService from './services/notes'

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  field: {
    margin: 10,
    display: 'block'
  },
  button: {
    margin: 10
  }
})

const EditNote = ({ notes, setNotes }) => {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [important, setImportant] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [contentError, setContentError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setContentError(false)

    if (!title && !content) {
      setTitleError(true)
      setContentError(true)
    } else {
      noteService
        .create({
          title: title,
          content: content,
          important: important
        })
        .then(response => {
          setNotes(notes.concat(response))
        })
    }

    console.log(title, content, important)
  }

  return (
    <Grid container item xs={12}>
      <form className={classes.root} noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => { setTitle(e.target.value) }}
          className={classes.field}
          label='Title'
          variant='outlined'
          fullWidth={true}
          error={titleError}
        />
        <TextField
          onChange={(e) => { setContent(e.target.value) }}
          className={classes.field}
          label='Content'
          variant='outlined'
          multiline
          rows='6'
          fullWidth
          error={contentError}
        />
        <FormControlLabel
          className={classes.button}
          onChange={() => { setImportant(!important) }}
          control={
            <Checkbox
              icon={<StarBorderIcon />}
              checkedIcon={<StarIcon />}
              name="Important"
              checked={important}
            />}
          label="Important"
        />
        <Button
          className={classes.button}
          type='submit'
          variant='contained'
          endIcon={<KeyboardArrowRightIcon />}
        >
          Save
        </Button>
      </form>
    </Grid>
  )
}

export default EditNote
