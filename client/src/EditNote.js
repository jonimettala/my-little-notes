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

const EditNote = ({ notes, setNotes, editing }) => {
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
  const [notFound, setNotFound] = useState(false)

  const fetchNote = () => {
    console.log(id)
    noteService
      .get(id)
      .then(note => {
        console.log(note)
        setFetchedNote(note)
        console.log(note)
        setTitle(note.title)
        setContent(note.content)
        setImportant(note.important)
        setLoading(false)
      })
      .catch(() => {
        setNotFound(true)
        console.log('not found')
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
        .then(response => {
          setNotes(notes.concat(response))
          setRedirectToList(true)
        })
    } else {
      noteService
        .update(id, title, content, important)
        .then(response => {
          const newNotes = notes
          let noteIndex = 0
          for (let note of newNotes) {
            if (note.id === id) {
              const newNote = {}
              newNote.id = id
              newNote.title = title
              newNote.content = content
              newNote.import = important
              newNote.created = note.created
              newNote.updated = new Date()
              console.log(newNote)
              note = newNote
              note.content = '!!!'
              console.log('muokattu')
              setNotes(notes.splice(noteIndex, noteIndex, newNote))
            }
            noteIndex++
          }
          setRedirectToList(true)
        }
        )
    }

    console.log(title, content, important)
  }

  if (redirectToList) {
    return <Redirect to={'/'} />
  } else if (loading && !notFound) {
    return <p>Loading</p>
  } else if (loading && notFound) {
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
              fullWidth={true}
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
