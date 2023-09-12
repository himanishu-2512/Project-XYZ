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
  styled,
  Modal,
  ButtonGroup,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import React, { useState, useEffect } from 'react'
import { Favorite, Image, MoreVert } from '@mui/icons-material'
import { Box } from '@mui/system'
import CommentIcon from '@mui/icons-material/Comment'
import Button from '@mui/material/Button'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import AddComments from '../Comments/AddComments'
import UserComments from '../Comments/UserComments'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import FeedSkeleton from '../Skeleton'

const SytledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#4b5561BB',
  backdropFilter: 'blur(5px)',
})

function Feed(props) {
  // console.log(props)
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const [isAdded, setIsAdded] = useState('')
  const [isCommentLoading, setIsCommentLoading] = useState(false)
  const [comment, setComment] = useState([])
  const [open, setOpen] = useState('')
  const [edit, setEdit] = useState('')
  const Id = localStorage.getItem('userId')
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')

  const username = window.localStorage.getItem('username')
  //   console.log(comment.reverse())
  useEffect(() => {
    if (open.length > 0) handleComments(open)
    // eslint-disable-next-line
  }, [isAdded])
  const handleComments = async (postId) => {
    // console.log("yes");
    setIsCommentLoading(true)
    await axios
      .get(`${BASE_URL}/post/getpostcomments/${postId}`)
      .then((res) => {
        setComment(res.data.post.comments)
      })
      .catch((error) => {
        toast.error(error, { pauseOnHover: 'false' })
      })
    setIsCommentLoading(false)
  }

  //Like
  const [color, setColor] = useState([])
  const handleLike = async (postId) => {
    const newIndex = color.indexOf(postId)
    // console.log(newIndex);
    if (newIndex > -1) {
      setColor(color.filter((e) => e !== postId))
      // //console.log(color)
    } else setColor(color.concat(postId))
    //console.log(id)
    await axios
      .post(`${BASE_URL}/like/post/${postId}/${Id}`)
      .then((res) => {})
      .catch((error) => {
        toast.error(error, { pauseOnHover: 'false' })
      })
  }

  // const handleLike = async (postId) => {
  //   if (liked) setLikeCount(likeCount - 1)
  //   else setLikeCount(likeCount + 1)
  //   setLiked(!liked)
  //   await axios
  //     .post(`${BASE_URL}/like/post/${postId}/${Id}`)
  //     .then((res) => {})
  //     .catch((error) => {
  //       toast.error(error, { pauseOnHover: 'false' })
  //     })
  // }

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
      .post(`${BASE_URL}/post/saveposts/${postId}`, body)
      .then((res) => {})
      .catch((error) => {
        toast.error(error, { pauseOnHover: 'false' })
      })
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

  // const [post, setPost] = useState({});
  const [imageUrl, setImageUrl] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    // const formData = new FormData();
    // formData.append("image", file);

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
  //image upload

  //update post
  const val = (e) => {
    e.preventDefault()
    const { value, name } = e.target
    if (name === 'title') setTitle(value)
    else setCaption(value)
  }

  // console.log("POST", post);

  const handleClickPost = (e, id) => {
    e.preventDefault()
    const post = { userId: Id, title, caption }
    if (Id && title && caption) {
      axios
        .post(`${BASE_URL}/post/updatepost/${Id}/${id}`, post)
        .then((res) => {
          toast.success(res.data.message, { pauseOnHover: 'false' })
          props.data.setCreate(!props.data.create)
        })
    } else {
      toast.warning('Post needs both a title and a caption', {
        pauseOnHover: 'false',
      })
    }
    setEdit('')
  }
  //update post

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
      const res = await axios.delete(`${BASE_URL}/post/deletepost/${Id}/${id}`)
      toast.success(res.data.message, { pauseOnHover: 'false' })
      props.data.setCreate(!props.data.create)
    } catch (error) {
      toast.error(error, { pauseOnHover: 'false' })
    }
  }

  const handleShare = (id) => {
    navigator.clipboard.writeText(
      `https://master--adorable-trifle-92330c.netlify.app/post/${id}`
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
          {props.data.testData?.post?.toReversed().map((item) => {
            return (
              <Paper
                sx={{
                  backgroundColor: '#1E293B',
                  maxWidth: '100%',
                  variant: 'outlined',
                  maxHeight: '100%',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  color: '#E4EEFA',
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
                        setCaption(item.caption)
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
                    setCaption('')
                    setImageUrl(null)
                  }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    width={400}
                    borderRadius={5}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 3,
                      background:
                        'linear-gradient(180deg, #05081D 0%, rgba(37, 57, 48,0) 100%)',
                      backgroundColor: 'rgba(4, 23, 46, 1)',
                      color: 'white',
                      padding: 4,
                    }}
                  >
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        alignItems: 'center',
                        gap: 4,
                        '.MuiInputBase-root': { borderRadius: '10px' },
                        'label.MuiInputLabel-shrink ': {
                          color: '#c6c6c6',
                        },
                        fieldset: {
                          border: '2px solid  #455e87',
                        },
                        '.MuiInputBase-root:hover fieldset': {
                          border: '2px solid  #455e87',
                        },
                        '.MuiInputBase-root.Mui-focused fieldset': {
                          border: '2px solid #b5b5b5',
                        },
                        '.MuiInputBase-root.Mui-focused label.MuiInputLabel-shrink':
                          {
                            color: '#b5b5b5',
                          },
                        overflow: 'auto',
                        '&::-webkit-scrollbar': {
                          display: 'none',
                        },
                        padding: 1,
                      }}
                    >
                      <FormControl
                        fullWidth
                        sx={{
                          backgroundColor: '#1e293bbb',
                          borderRadius: '10px',
                        }}
                      >
                        <InputLabel
                          htmlFor="standard-multiline-static"
                          sx={{
                            color: '#8aa6aa',
                          }}
                        >
                          Title
                        </InputLabel>
                        <OutlinedInput
                          id="standard-multiline-static"
                          name="title"
                          label="Title"
                          placeholder="Title"
                          sx={{ color: '#cad8e8' }}
                          value={title}
                          onChange={val}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        sx={{
                          backgroundColor: '#1e293bbb',
                          borderRadius: '10px',
                        }}
                      >
                        <InputLabel
                          htmlFor="standard-multiline-static"
                          sx={{
                            color: '#8aa6aa',
                          }}
                        >
                          Caption
                        </InputLabel>
                        <OutlinedInput
                          id="standard-multiline-static"
                          name="caption"
                          label="Caption"
                          multiline
                          rows={3}
                          placeholder="What's on your mind?"
                          sx={{ color: '#cad8e8' }}
                          value={caption}
                          onChange={val}
                          variant="outlined"
                        />
                      </FormControl>

                      <label
                        htmlFor="upload-image"
                        style={{
                          backgroundColor: '#d5eaed',
                          borderRadius: '20px',
                          width: '100%',
                        }}
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
                            // width="auto"
                            height={125}
                            sx={{
                              backgroundImage: `url(${imageUrl})`,
                              backgroundPosition: 'center',
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                              minWidth: '300px',
                            }}
                          ></Box>
                          <Button
                            sx={{
                              border: '2px solid #455e87',
                              borderRadius: '20px',
                              width: '40%',
                              color: '#8aa6aa',
                              '&:hover': { color: '#cad8e8' },
                            }}
                            onClick={() => remove()}
                          >
                            Remove
                          </Button>
                        </>
                      )}
                      <ButtonGroup
                        sx={{ backgroundColor: 'transparent' }}
                        fullWidth
                        variant="contained"
                        aria-label="button group"
                        onClick={(e) => handleClickPost(e, item._id)}
                      >
                        <Button
                          sx={{
                            borderRadius: '20px',
                            paddingX: 2,
                            color: 'white',
                            '&:hover': { color: '#cad8e8' },
                          }}
                          onClick={handleSave}
                        >
                          Edit
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </Box>
                </SytledModal>
                <CardContent>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: '0px',
                      textDecoration: 'none',
                      textAlign: 'left',
                    }}
                  >
                    {item.caption}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <CardMedia
                    sx={{
                      display: 'block',
                      maxWidth: '450px',
                      maxHeight: '450px',
                      width: { md: '100%', xl: '100%' },
                      height: '100%',
                    }}
                    component="img"
                    image="images/bird.jpg"
                    height={340}
                    width={450}
                    loading="lazy"
                  />
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
                      color: color.includes(item._id) ? '#C70039' : 'white',
                      textTransform: 'none',
                    }}
                  >
                    {item.likes.length === 1
                      ? `${item.likes.length} Like`
                      : `${item.likes.length} Likes`}
                  </Button>
                  <Button
                    startIcon={<CommentIcon />}
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                    }}
                    onClick={() => {
                      setComment([])
                      handleChange(item._id)
                      if (item.comments.length > 0) handleComments(item._id)
                    }}
                    aria-expanded={true}
                    aria-label="show more"
                  >
                    Comment
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
                      type={'post'}
                    />
                    <Box sx={{ marginTop: 4 }}>
                      {isCommentLoading ? (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: '#42a5f5',
                            marginLeft: '50%',
                          }}
                        />
                      ) : comment?.length > 0 ? (
                        comment.toReversed().map((items, index) => {
                          return (
                            <UserComments
                              answers={items}
                              key={index}
                              setIsAdded={setIsAdded}
                              isAdded={isAdded}
                              setComments={setComment}
                              comment={comment}
                              postId={item._id}
                              type={'post'}
                              postOwnerId={item.userId._id}
                            />
                          )
                        })
                      ) : (
                        ''
                      )}
                    </Box>
                  </CardContent>
                </Collapse>
              </Paper>
            )
          })}
        </Box>
      ) : (
        <FeedSkeleton loading={props.loading} data={props.data} />
      )}
    </>
  )
}

export default Feed
