import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
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

const EditNote = ({ editing }) => {
  const { id } = useParams()

  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [important, setImportant] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [contentError, setContentError] = useState(false)
  const [redirectToList, setRedirectToList] = useState(false)
  const [fetchedNote, setFetchedNote] = useState({})
  const [loading, setLoading] = useState(editing)
  const [loadingFailed, setLoadingFailed] = useState(false)
  const [connectionError, setConnectionError] = useState(false)

  const fetchNote = () => {
    noteService
      .get(id)
      .then(note => {
        setFetchedNote(note)
        setTitle(note.title)
        setContent(note.content)
        setImportant(note.important)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setLoadingFailed(true)

        if (err.response.status === 500) {
          setConnectionError(true)
        }
      })
  }
  if (editing) {
    useEffect(fetchNote, [])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setContentError(false)

    if (!title && !content) {
      setTitleError(true)
      setContentError(true)
    } else if (!editing) {
      noteService
        .create({
          title: title,
          content: content,
          important: important
        })
        .then(() => {
          setRedirectToList(true)
        })
        .catch(() => {
          window.alert('Failed to reach the server. Please try again later.')
        })
    } else {
      noteService
        .update(id, title, content, important)
        .then(() => {
          setRedirectToList(true)
        })
        .catch(() => {
          window.alert('Failed to reach the server. Please try again later.')
        })
    }
  }

  if (redirectToList) {
    return <Redirect to={'/'} />
  } else if (connectionError) {
    return <p>Failed to reach the server.</p>
  } else if (loading) {
    return <p>Loading</p>
  } else if (loadingFailed) {
    return <p>Note not found</p>
  } else {
    return (
      <Grid container item xs={12}>
          <form className={classes.root} noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              defaultValue={fetchedNote.title}
              onChange={(e) => { setTitle(e.target.value) }}
              className={classes.field}
              label='Title'
              variant='outlined'
              fullWidth
              error={titleError}
            />
            <TextField
              defaultValue={fetchedNote.content}
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
}

export default EditNote
