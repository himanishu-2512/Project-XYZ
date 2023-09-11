import { Avatar, Box, CircularProgress } from '@mui/material'
import React from 'react'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import GifIcon from '@mui/icons-material/Gif'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import { useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import { toast } from 'react-toastify'

function Comments(props) {
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const [comment, setComment] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const input = useRef(null)

  // console.log(props)
  const handleClick = (e) => {
    props.type === 'post' ? handleClickPost(e) : handleClickQuestion(e)
  }
  const Id = localStorage.getItem('userId')

  const val = (e) => {
    e.preventDefault()
    setComment(e.target.value)
  }

  const handleClickPost = async (e) => {
    setIsPosting(true)
    e.preventDefault()
    const body = { body: comment }
    if (Id && props.postId && comment) {
      const res = await axios.post(
        `${BASE_URL}/comment/post/${props.postId}/${Id}/newcomment`,
        body
      )
      toast.success(res.data.message)
      props.setIsAdded(!props.isAdded)
      input.current.firstChild.value = ''
    } else {;<CircularProgress size={24} sx={{ color: '#42a5f5' }} />
      toast.warning('No empty comments', { pauseOnHover: 'false' })
    }
    setIsPosting(false)
  }
  const handleClickQuestion = async (e) => {
    setIsPosting(true)
    e.preventDefault()
    const body = { body: comment }
    if (Id && props.postId && comment) {
      const res = await axios.post(
        `${BASE_URL}/question/answer/newanswer/${Id}/${props.postId}`,
        body
      )
      toast.success(res.data.message)
      props.setIsAdded(!props.isAdded)
      input.current.firstChild.value = ''
    } else {
      toast.warning('No empty answers', { pauseOnHover: 'false' })
    }
    setIsPosting(false)
  }
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Avatar />

        <Paper
          component="form"
          fullWidth
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '87%',
            backgroundColor: '#4D5567',
          }}
        >
          <InputBase
            ref={input}
            sx={{ ml: 1, flex: 1, color: 'white' }}
            placeholder="Write a comment..."
            inputProps={{ 'aria-label': 'write a comment...' }}
            onChange={(e) => val(e)}
            name="body"
          />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="Add GIF">
            <GifIcon sx={{ color: '#42a5f5' }} />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <IconButton
            type="button"
            color="primary"
            sx={{ p: '10px' }}
            aria-label="send"
            onClick={(e) => handleClick(e)}
          >
            {isPosting ? (
              <CircularProgress size={24} sx={{ color: '#42a5f5' }} />
            ) : (
              <SendIcon sx={{ color: '#42a5f5' }} />
            )}
          </IconButton>
        </Paper>
      </Box>
    </Box>
  )
}

export default Comments
