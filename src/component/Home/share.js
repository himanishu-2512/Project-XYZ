import axios from 'axios'
import { toast } from 'react-toastify'
import {
  Button,
  ButtonGroup,
  Fab,
  FormControl,
  InputLabel,
  Modal,
  OutlinedInput,
  styled,
  Tooltip,
} from '@mui/material'
import React, { useState } from 'react'
import { Add as AddIcon, Image } from '@mui/icons-material'
import { Box } from '@mui/system'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import { Paper } from '@mui/material'

const SytledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#4b5561BB',
  backdropFilter: 'blur(5px)',
})

const Add = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const [post, setPost] = useState({})
  const [value, setValue] = useState('0')
  const Id = localStorage.getItem('userId')

  //image upload
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [imageUrl, setImageUrl] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    // const formData = new FormData();
    // formData.append("image", file);

    reader.onloadend = () => {
      setImageUrl(reader.result)
      console.log(value)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  const remove = () => {
    setImageUrl(null)
  }
  //image upload

  const val = (e) => {
    e.preventDefault()
    const { value, name } = e.target
    setPost(() => {
      return {
        ...post,
        [name]: value,
        userId: Id,
      }
    })
  }
  const handlClick = (e) => {
    if (value === '0') {
      handlClickPost(e)
    } else {
      handlClickQuestion(e)
    }
  }

  const handlClickPost = (e) => {
    e.preventDefault()
    const { userId, title, caption } = post
    if (userId && title && caption) {
      axios.post(`${BASE_URL}/post/newpost`, post).then((res) => {
        toast.success(res.data.message)
        props.setCreate(!props.create)
      })
    } else {
      toast.warning('Post needs both a title and a caption', {
        pauseOnHover: 'false',
      })
    }
    props.setOpen(false)
  }

  const handlClickQuestion = (e) => {
    e.preventDefault()
    const { userId, title, description } = post
    if (userId && title && description) {
      axios.post(`${BASE_URL}/question/newquestion`, post).then((res) => {
        toast.success(res.data.message)
        props.setCreate(!props.create)
      })
    } else {
      toast.warning('Question needs both a title and a description', {
        pauseOnHover: 'false',
      })
    }
    props.setOpen(false)
  }

  return (
    <>
      <Tooltip
        onClick={(e) => props.setOpen(true)}
        title="Add Post"
        sx={{
          position: 'fixed',
          bottom: 20,
          left: { xs: 'calc(50% - 25px)', md: 30 },
          display: { xs: 'none', sm: 'none', md: 'flex' },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={props.open}
        onClose={(e) => {
          props.setOpen(false)
          setPost({})
          setImageUrl(null)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={500}
          p={3}
          borderRadius={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            background:
              'linear-gradient(180deg, #05081D 0%, rgba(37, 57, 48,0) 100%)',
            backgroundColor: 'rgba(4, 23, 46, 1)',
            color: 'white',
            padding: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{ backgroundColor: 'transparent', width: '100%' }}
          >
            <Box
              sx={{
                width: '100%',
                typography: 'body1',
                backgroundColor: '#1E293B',
                borderRadius: '5px',
              }}
            >
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <TabList onChange={handleChange}>
                    <Tab
                      sx={{ color: 'white' }}
                      label="Create Post"
                      value="0"
                    />
                    <Tab
                      sx={{ color: 'white' }}
                      label="Ask a Question"
                      value="1"
                    />
                  </TabList>
                </Box>
              </TabContext>
            </Box>
          </Paper>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
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
              '.MuiInputBase-root.Mui-focused label.MuiInputLabel-shrink': {
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
                id="outlined-static"
                name="title"
                label="Title"
                placeholder="Title"
                sx={{ color: '#cad8e8' }}
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
                name={value === '0' ? 'caption' : 'description'}
                label="Caption"
                multiline
                rows={3}
                placeholder="What's on your mind?"
                sx={{ color: '#cad8e8' }}
                onChange={val}
                variant="outlined"
              />
            </FormControl>
          </Box>
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
            onClick={handlClick}
          >
            <Button
              sx={{
                borderRadius: '20px',
                paddingX: 2,
                color: 'white',
                '&:hover': { color: '#cad8e8' },
              }}
            >
              Post
            </Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </>
  )
}

export default Add
