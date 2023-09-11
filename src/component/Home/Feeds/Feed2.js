import {
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
  Paper,
  Divider,
  Menu,
  MenuItem,
  Modal,
  styled,
  TextField,
  ButtonGroup,
} from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import React, { useState, useEffect } from 'react'
import {
  Favorite,
  Image,
  KeyboardArrowDown,
  MoreVert,
} from '@mui/icons-material'
import { Box } from '@mui/system'
import CommentIcon from '@mui/icons-material/Comment'
import Button from '@mui/material/Button'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import AddComments from '../Comments/AddComments'
import UserComments from '../Comments/UserComments'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Skeleton from '../skeleton'

const SytledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

function Feed(props) {
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const [isAdded, setIsAdded] = useState('')
  const [comment, setComment] = useState([])
  const [open, setOpen] = useState(null)
  const [edit, setEdit] = useState('')
  const username = window.localStorage.getItem('username')
  const [title, setTitle] = useState('')
  const Id = localStorage.getItem('userId')
  const [description, setDescription] = useState('')
  useEffect(() => {
    if (open !== null) handleComments(open)
    // eslint-disable-next-line
  }, [isAdded])
  const handleComments = async (postId) => {
    // console.log("yes");
    await axios
      .get(`${BASE_URL}/question/getquestionscomments/${postId}`)
      .then((res) => {
        console.log(res.data)
        setComment(res.data.questions.answers)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  //Like
  const [color, setColor] = useState([])
  const handleLike = async (questionId) => {
    // console.log(questionId)
    const newIndex = color.indexOf(questionId)
    if (newIndex > -1) {
      setColor(color.filter((e) => e !== questionId))
    } else setColor(color.concat(questionId))
    await axios
      .post(`${BASE_URL}/like/question/${questionId}/${Id}`)
      .then((res) => {})
      .catch((error) => {
        toast.error(error, { pauseOnHover: 'false' })
      })

    //console.log(newIndex, color)
  }

  //Comment

  const handleChange = (id) => {
    if (open === id) setOpen(null)
    else setOpen(id)
  }

  //Save
  const [save, setSave] = useState([])
  const handleSave = async (postId) => {
    const userId = window.localStorage.getItem('userId')
    const body = { userId: userId }
    var index = save.indexOf(postId)
    if (index > -1) {
      setSave(save.filter((e) => e !== postId))
      //console.log(postId)
    } else {
      setSave(save.concat(postId))
    }
    await axios
      .post(`${BASE_URL}/question/questions/savequestions/${postId}`, body)
      .then((res) => {})
      .catch((error) => {
        toast.error(error, { pauseOnHover: 'false' })
      })
  }

  const [expand, setExpand] = useState([])
  const handleExpand = (id) => {
    var index = expand.indexOf(id)
    if (index > -1) {
      setExpand(expand.filter((e) => e !== id))
      //console.log(id)
    } else {
      setExpand(expand.concat(id))
    }
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const [menuOpenId, setMenuOpenId] = useState(null)
  const handleAnchor = (e, id) => {
    setMenuOpenId(id)
    setAnchorEl(e.currentTarget)
  }
  const handleAnchorClose = () => {
    setMenuOpenId(null)
    setAnchorEl(null)
  }
  const [imageUrl, setImageUrl] = useState(null)
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setImageUrl(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  const remove = () => {
    setImageUrl(null)
  }
  const val = (e) => {
    e.preventDefault()
    const { value, name } = e.target
    if (name === 'title') setTitle(value)
    else setDescription(value)
  }
  const handleClickPost = (e, id) => {
    e.preventDefault()
    const post = { userId: Id, title, description }
    if (Id && title && description) {
      axios
        .post(`${BASE_URL}/question/updatequestion/${Id}/${id}`, post)
        .then((res) => {
          toast.success(res.data.message, { pauseOnHover: 'false' })
          props.data.setCreate(!props.data.create)
        })
    } else {
      toast.warning('Question needs both a title and a description', {
        pauseOnHover: 'false',
      })
    }
    setEdit('')
  }

  const timeDemo = (time) => {
    var msPerMinute = 60 * 1000
    var msPerHour = msPerMinute * 60
    var msPerDay = msPerHour * 24
    var msPerMonth = msPerDay * 30
    var msPerYear = msPerDay * 365

    var elapsed = new Date() - new Date(time)

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) === 1
        ? Math.round(elapsed / 1000) + ' second ago'
        : Math.round(elapsed / 1000) + ' seconds ago'
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) === 1
        ? Math.round(elapsed / msPerMinute) + ' minute ago'
        : Math.round(elapsed / msPerMinute) + ' minutes ago'
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) === 1
        ? Math.round(elapsed / msPerHour) + ' hour ago'
        : Math.round(elapsed / msPerHour) + ' hours ago'
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) === 1
        ? '' + Math.round(elapsed / msPerDay) + ' day ago'
        : '' + Math.round(elapsed / msPerDay) + ' days ago'
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) === 1
        ? '' + Math.round(elapsed / msPerMonth) + ' month ago'
        : '' + Math.round(elapsed / msPerMonth) + ' months ago'
    } else {
      return Math.round(elapsed / msPerYear) === 1
        ? '' + Math.round(elapsed / msPerYear) + ' year ago'
        : '' + Math.round(elapsed / msPerYear) + ' years ago'
    }
  }

  const handleEdit = (id) => {
    setMenuOpenId(null)
    setEdit(id)
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/question/deletequestion/${Id}/${id}`
      )
      toast.success(res.data.message, { pauseOnHover: 'false' })
      props.data.setCreate(!props.data.create)
    } catch (error) {
      toast.error(error, { pauseOnHover: 'false' })
    }
  }

  const handleShare = (id) => {
    navigator.clipboard.writeText(
      `https://master--adorable-trifle-92330c.netlify.app/question/${id}`
    )
    toast.success('Link copied to clipboard', { pauseOnHover: 'false' })
    setMenuOpenId(null)
  }

  return (
    <>
      {props.data.testData ? (
        <Box
          sx={{
            maxWidth: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <ToastContainer
            autoClose={3000}
            position="bottom-right"
            hideProgressBar
          />
          {props.data.testData?.question?.toReversed().map((item) => {
            return (
              <Paper
                sx={{
                  backgroundColor: '#1E293B',
                  maxWidth: '100%',
                  variant: 'outlined',
                  maxHeight: '100%',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  color: '#e4eefa',
                  boxShadow: '0px -2px #242f41',
                  padding: 1,
                }}
                elevation={3}
                key={item._id}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: blueGrey[500] }} aria-label="recipe">
                      {item.userId.username[0].toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton
                      aria-label="settings"
                      onClick={(e) => handleAnchor(e, item._id)}
                    >
                      <MoreVert sx={{ color: 'white' }} />
                    </IconButton>
                  }
                  subheaderTypographyProps={{ color: '#8aa6aa' }}
                  title={item.userId.username}
                  subheader={timeDemo(item.createdAt)}
                />
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  open={item._id === menuOpenId}
                  anchorEl={anchorEl}
                  onClose={(e) => handleAnchorClose()}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  sx={{
                    ul: {
                      backgroundColor: '#4D5567',
                      paddingRight: 2,
                      borderRadius: 2,
                    },
                    li: { color: 'white' },
                    '.MuiPaper-root': { backgroundColor: 'transparent' },
                  }}
                >
                  {item.userId.username === username && (
                    <MenuItem
                      onClick={() => {
                        setTitle(item.title)
                        setDescription(item.description)
                        handleEdit(item._id)
                      }}
                    >
                      Edit
                    </MenuItem>
                  )}
                  {item.userId.username === username && (
                    <MenuItem onClick={() => handleDelete(item._id)}>
                      Delete
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => handleShare(item._id)}>
                    Share
                  </MenuItem>
                </Menu>
                <SytledModal
                  open={edit === item._id}
                  onClose={(e) => {
                    setEdit('')
                    setTitle('')
                    setDescription('')
                    setImageUrl(null)
                  }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    width={400}
                    bgcolor={'background.default'}
                    color={'text.primary'}
                    p={3}
                    borderRadius={5}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                  >
                    <TextField
                      sx={{ width: '100%' }}
                      id="standard-multiline-static"
                      name="title"
                      value={title}
                      placeholder="Title"
                      variant="outlined"
                      onChange={val}
                    />
                    <TextField
                      sx={{ width: '100%' }}
                      id="standard-multiline-static"
                      multiline
                      value={description}
                      name="caption"
                      rows={3}
                      placeholder="What's on your mind?"
                      variant="outlined"
                      onChange={val}
                    />

                    <label
                      htmlFor="upload-image"
                      style={{ backgroundColor: 'lightyellow' }}
                    >
                      <Button
                        variant="contained"
                        component="span"
                        sx={{
                          backgroundColor: 'transparent',
                          '&:hover': { backgroundColor: 'transparent' },
                          // display: "inline"
                          color: 'black',
                          textTransform: 'none',
                          width: '100%',
                        }}
                      >
                        Upload Image{' '}
                        <Image color="secondary" sx={{ marginLeft: '8px' }} />
                      </Button>
                      <input
                        id="upload-image"
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleFileUpload}
                      />
                    </label>

                    {imageUrl && (
                      <>
                        <Box
                          width="auto"
                          height={100}
                          sx={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                          }}
                        ></Box>
                        <Button onClick={() => remove()}>remove image</Button>
                      </>
                    )}
                    <ButtonGroup
                      // sx={{ marginTop: "5px" }}
                      fullWidth
                      variant="contained"
                      aria-label="outlined primary button group"
                      onClick={(e) => handleClickPost(e, item._id)}
                    >
                      <Button>Edit</Button>
                    </ButtonGroup>
                  </Box>
                </SytledModal>
                <CardContent sx={{}}>
                  <Typography
                    variant="h6"
                    sx={{
                      marginTop: '0px',
                      textDecoration: 'none',
                      textAlign: 'left',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <Collapse
                    in={expand.includes(item._id) ? true : false}
                    collapsedSize={'3rem'}
                    timeout={500}
                    sx={{
                      '.MuiCollapse-wrapperInner': {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                      },
                      paddingX: 2,
                      width: '100%',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: 'none',
                        textAlign: 'left',
                        width: '100%',
                      }}
                    >
                      {item.description}
                    </Typography>
                    <CardMedia
                      sx={{
                        display: 'block',
                        maxWidth: '450px',
                        maxHeight: '450px',
                        width: '100%',
                        height: '100%',
                      }}
                      component="img"
                      image="images/bird.jpg"
                    />
                  </Collapse>
                  <Box
                    onClick={() => handleExpand(item._id)}
                    sx={{
                      cursor: 'pointer',
                      background: expand.includes(item._id)
                        ? 'linear-gradient(transparent,transparent)'
                        : 'linear-gradient(transparent,#00000050)',
                      position: 'absolute',
                      bottom: 0,
                      height: expand.includes(item._id) ? '15%' : '100%',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: 'all 0.5s',
                    }}
                  >
                    <KeyboardArrowDown
                      sx={{
                        color: 'white',
                        rotate: expand.includes(item._id) ? '180deg' : '',
                        filter: 'drop-shadow(0px 1px 2px black);',
                        transition: 'rotate 0.5s',
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    paddingTop: 1,
                  }}
                >
                  <Button
                    startIcon={<Favorite />}
                    onClick={() => handleLike(item._id)}
                    style={{
                      color: color.includes(item._id) ? '#e72354' : 'white',
                      padding: '0',
                      textTransform: 'none',
                    }}
                    disableRipple
                  >
                    {item.likes.length + ' '}Likes
                  </Button>
                  <Button
                    startIcon={<CommentIcon />}
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                    }}
                    onClick={() => {
                      handleChange(item._id)
                      handleComments(item._id)
                    }}
                    aria-expanded={true}
                    aria-label="show more"
                  >
                    Answer
                  </Button>
                  <Button
                    startIcon={<BookmarkIcon />}
                    sx={{
                      textTransform: 'none',
                    }}
                    onClick={() => handleSave(item._id)}
                    style={{
                      color: save.includes(item._id) ? '#42a5f5' : 'white',
                    }}
                  >
                    {save.includes(item._id) ? 'Saved' : 'Save'}
                  </Button>
                </Box>
                {open === item._id ? true : false && <Divider maxWidth="90%" />}
                <Collapse
                  in={open === item._id ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    <AddComments
                      postId={item._id}
                      setIsAdded={setIsAdded}
                      isAdded={isAdded}
                      setComments={setComment}
                      comment={comment}
                      type={'question'}
                    />

                    {comment.length > 0
                      ? comment.toReversed().map((items, index) => {
                          return (
                            <UserComments
                              answers={items}
                              key={index}
                              setIsAdded={setIsAdded}
                              isAdded={isAdded}
                              setComments={setComment}
                              comment={comment}
                              postId={item._id}
                              type={'question'}
                              postOwnerId={item.userId._id}
                            />
                          )
                        })
                      : ''}
                  </CardContent>
                </Collapse>
              </Paper>
            )
          })}
        </Box>
      ) : (
        <Skeleton loading={props.loading} data={props.data} />
      )}
    </>
  )
}

export default Feed
