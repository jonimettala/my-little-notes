import React, { useState } from 'react'
import { makeStyles, Grid, TextField, Button } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  field: {
    margin: 10,
    display: 'block'
  },
  submit: {
    margin: 10
  }
})

const AddNote = () => {
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
        <Button
          className={classes.submit}
          type='submit'
          variant='contained'
          endIcon={<KeyboardArrowRightIcon />}
        >
          Add
        </Button>
      </form>
    </Grid>
  )
}

export default AddNote
