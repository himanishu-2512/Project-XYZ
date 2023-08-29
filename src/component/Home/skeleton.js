import {
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Paper,
  Divider,
  Menu,
  MenuItem,
  styled,
  Modal,
  TextField,
  ButtonGroup,
  Skeleton,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React, { useState } from "react";
import { Favorite, Image, MoreVert } from "@mui/icons-material";
import { Box } from "@mui/system";
import CommentIcon from "@mui/icons-material/Comment";
import Button from "@mui/material/Button";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";




const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function Skel(props) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [open, setOpen] = useState("");
  const [edit, setEdit] = useState("")
  const Id = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("")

  //username
  const username = window.localStorage.getItem("username")
  //   console.log(comment.reverse())
  const handleComments = async (postId) => {
    // console.log("yes");
    await axios
      .get(`${BASE_URL}/post/getpostcomments/${postId}`)
      .then((res) => {
        // setComment(res.data.post.comments);
      })
      .catch((error) => {
        toast.error(error, { pauseOnHover: "false" })
      });
  };
  //Like
  const [color, setColor] = useState([]);
  const handleLike = async (postId) => {
    //console.log(id)
    await axios
      .post(`${BASE_URL}/like/post/${postId}/${Id}`)
      .then((res) => {
      })
      .catch((error) => {
        toast.error(error, { pauseOnHover: "false" })
      });
    const newIndex = color.indexOf(postId);
    if (newIndex > -1) {
      setColor(color.filter(e => e !== postId));
      // //console.log(color)
    }
    else
      setColor(color.concat(postId));
    //console.log(newIndex, color)
  };

  //Comment

  const handleChange = (id) => {
    if (open === id) setOpen(null);
    else setOpen(id);
  }
  //Save
  const [save, setSave] = useState([]);
  const handleSave = async (postId) => {
    const userId = window.localStorage.getItem("userId")
    const body = { userId: userId }
    await axios
      .post(`${BASE_URL}/post/saveposts/${postId}`, body)
      .then((res) => {
      })
      .catch((error) => {
        toast.error(error, { pauseOnHover: "false" })
      });
    var index = save.indexOf(postId);
    if (index > -1) {
      setSave(save.filter(e => e !== postId))
      //console.log(postId)
    } else {
      setSave(save.concat(postId))
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const handleAnchor = (e, id) => {
    setMenuOpenId(id);
    setAnchorEl(e.currentTarget);
  };
  const handleAnchorClose = () => {
    setMenuOpenId(null);
    setAnchorEl(null);
  };

  // const [post, setPost] = useState({});
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    // const formData = new FormData();
    // formData.append("image", file);

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const remove = () => {
    setImageUrl(null);
  };


  //update post
  const val = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    if (name === "title") setTitle(value)
    else setCaption(value)
  };


  // console.log("POST", post);

  const handleClickPost = (e, id) => {
    e.preventDefault();
    const post = { userId: Id, title, caption }
    if (Id && title && caption) {
      axios.post(`${BASE_URL}/post/updatepost/${Id}/${id}`, post).then((res) => {
        toast.success(res.data.message, { pauseOnHover: "false" });
        props.data.setCreate(!(props.data.create))
      });
    } else {
      toast.warning("Post needs both a title and a caption", { pauseOnHover: "false" });
    }
    setEdit("");
  };
  //update post

  const timeDemo = (time) => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = new Date() - new Date(time);

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) === 1
        ? Math.round(elapsed / 1000) + " second ago"
        : Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) === 1
        ? Math.round(elapsed / msPerMinute) + " minute ago"
        : Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) === 1
        ? Math.round(elapsed / msPerHour) + " hour ago"
        : Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) === 1
        ? "" + Math.round(elapsed / msPerDay) + " day ago"
        : "" + Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) === 1
        ? "" + Math.round(elapsed / msPerMonth) + " month ago"
        : "" + Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) === 1
        ? "" + Math.round(elapsed / msPerYear) + " year ago"
        : "" + Math.round(elapsed / msPerYear) + " years ago";
    }
  };
  const handleEdit = (id) => {
    setMenuOpenId(null)
    setEdit(id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/post/deletepost/${Id}/${id}`);
      toast.success(res.data.message, { pauseOnHover: "false" })
      props.data.setCreate(!(props.data.create))
    } catch (error) {
      toast.error(error, { pauseOnHover: "false" })
    }

  }

  const handleShare = (id) => {
    navigator.clipboard.writeText(`${BASE_URL}/post/getpost/${id}`)
    toast.success("Link copied to clipboard", { pauseOnHover: "false" })
    setMenuOpenId(null)
  }
  let a = ["a", "b", "c"]
  let loading = true
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <ToastContainer autoClose={3000} position="bottom-right" hideProgressBar />
      {a.toReversed().map((item) => {
        return (<Paper
          sx={{
            backgroundColor: "#1E293B",
            maxWidth: "100%",
            variant: "outlined",
            maxHeight: "100%",
            borderRadius: "10px",
            marginBottom: "20px",
            color: "#e4eefa",
            boxShadow: "0px -2px #242f41",
            padding: 1
          }}
          elevation={3}
          key={item._id}
        >
          <CardHeader
            avatar={
              loading === true ? (
                <Skeleton animation="wave"
                  sx={{
                    backgroundColor: "#5d7987"
                  }}
                  variant="circular"
                  width={40}
                  height={40} />
              ) : (
                <Avatar sx={{ bgcolor: blueGrey[500] }} aria-label="recipe">
                  {item.toUpperCase()}
                </Avatar>)
            }
            action={
              loading === true ? null : (
                <IconButton aria-label="settings" onClick={(e) => handleAnchor(e, item._id)}>
                  <MoreVert />
                </IconButton>)
            }
            title={
              loading === true ? (<Skeleton
                animation="wave"
                sx={{
                  backgroundColor: "#5d7987"
                }}
                height={20}
                width="80%"
                style={{ marginBottom: 6 }}
              />) : (item)
            }
            subheader={
              loading === true ? (
                <Skeleton 
                  animation="wave"
                  sx={{
                    backgroundColor: "#5d7987"
                  }}
                  height={20}
                  width="40%" />) : (timeDemo(item))
            }
          />
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={item._id === menuOpenId}
            anchorEl={anchorEl}
            onClose={(e) => handleAnchorClose()}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {item === username && <MenuItem onClick={() => {
              setTitle(item)
              setCaption(item)
              handleEdit(item)
            }}>
              Edit
            </MenuItem>
            }
            {item === username && <MenuItem onClick={() => handleDelete(item._id)}>Delete</MenuItem>}

            <MenuItem onClick={() => handleShare(item._id)} >Share</MenuItem>
          </Menu>
          <SytledModal
            open={edit === item}
            onClose={(e) => {
              setEdit("");
              setTitle("");
              setCaption("")
              setImageUrl(null);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              width={400}
              bgcolor={"background.default"}
              color={"text.primary"}
              p={3}
              borderRadius={5}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >

              <TextField
                sx={{ width: "100%" }}
                id="standard-multiline-static"
                name="title"
                value={title}
                placeholder="Title"
                variant="outlined"
                onChange={val}
              />
              <TextField
                sx={{ width: "100%" }}
                id="standard-multiline-static"
                multiline
                value={caption}
                name="caption"
                rows={3}
                placeholder="What's on your mind?"
                variant="outlined"
                onChange={val}
              />

              <label
                htmlFor="upload-image"
                style={{ backgroundColor: "lightyellow" }}
              >
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "transparent" },
                    // display: "inline"
                    color: "black",
                    textTransform: "none",
                    width: "100%",
                  }}
                >
                  Upload Image{" "}
                  <Image color="secondary" sx={{ marginLeft: "8px" }} />
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
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
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
            <Typography variant="body2" sx={{ marginTop: "0px", textDecoration: "none", textAlign: "left" }}>
              {loading === true ? (<Skeleton sx={{ height: 50, backgroundColor: "#5d7987"}}
                animation="wave"
              />) : (`${item}`)}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
            {loading === true ? (<Skeleton 
              sx={{ 
                height: 350, 
                width: "100%", 
                backgroundColor: "#5d7987" 
              }}
              animation="wave"
              variant="rectangular" />) : (
              <CardMedia
                sx={{
                  display: "block",
                  maxWidth: "450px",
                  maxHeight: "450px",
                  width: "100%",
                  height: "100%",
                }}
                component="img"
                image="images/iiitr.png"
              />
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
            <Typography variant="body2" sx={{ marginLeft: "2%" }}>
              {loading === true ? (<Skeleton 
                sx={{ 
                  height: 15,
                  width: 100, 
                  backgroundColor: "#5d7987" 
                }}
                animation="wave"
              />) : (`${item} Likes`)}
            </Typography>
            <Typography variant="body2" sx={{ marginRight: "2%" }}>
              {loading === true ? (<Skeleton 
                sx={{ 
                  height: 15,
                  width: 100, 
                  backgroundColor: "#5d7987" 
                }}
                animation="wave"
              />) : (`${item} Comments`)}
            </Typography>
          </Box>
          <Divider />
          {loading === true ? null : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                startIcon={<Favorite />}
                onClick={() => handleLike(item)}
                style={{ color: color.includes(item) ? "red" : "black" }}
              >
                Like
              </Button>
              <Button
                startIcon={<CommentIcon />}
                sx={{ color: "black" }}
                onClick={() => {
                  handleChange(item._id);
                  handleComments(item._id);
                }} aria-expanded={true}
                aria-label="show more"
              >
                Comment
              </Button>
              <Button
                startIcon={<BookmarkIcon />}
                onClick={() => handleSave(item)}
                style={{ color: save.includes(item) ? "blue" : "black" }}
              >
                {save.includes(item) ? "Saved" : "Save"}
              </Button>
            </Box>
          )}
        </Paper>)
      })}
    </Box>
  );
}


export default Skel;
