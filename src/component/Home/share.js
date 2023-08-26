import axios from "axios";
import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
  Container,
} from "@mui/material";
import React, { useState } from "react";
import {
  Add as AddIcon,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Paper } from "@mui/material";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const Add = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({});
  const [value, setValue] = useState("0");
  const Id = localStorage.getItem("userId");
    

  //image upload
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    // const formData = new FormData();
    // formData.append("image", file);

    reader.onloadend = () => {
      setImageUrl(reader.result);
          console.log(value);

    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const remove = () => {
    setImageUrl(null);
  };
  //image upload

  

  const val = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setPost(() => {
      return {
        ...post,
        [name]: value,
        userId: Id,
      };
    });
  };
  const handlClick = (e) => {
    if(value == "0"){
      handlClickPost(e);
    }else{
      handlClickQuestion(e);
    }
  }

  console.log("POST",post);

  const handlClickPost = (e) => {
    e.preventDefault();
    const { userId, title, caption } = post;
    if (userId && title && caption) {
      axios.post(`${BASE_URL}/post/newpost`, post).then((res) => {
        alert(res.data.message);
        props.setCreate(!(props.create))
      });
    } else {
      alert("Post needs both a title and a caption");
    }
    setOpen(false);
  };


  const handlClickQuestion = (e) => {
    e.preventDefault();
    const { userId, title, description } = post;
    if (userId && title && description) {
      axios.post(`${BASE_URL}/question/newquestion`, post).then((res) => {
        alert(res.data.message);
        props.setCreate(!props.create);
      });
    } else {
      alert("Question needs both a title and a description");
    }
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Add Post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={(e) => {
          setOpen(false);
          setPost({});
          setImageUrl(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          // height={330}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Paper elevation={0}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Create Post" value="0" />
                    <Tab label="Ask a Question" value="1" />
                  </TabList>
                </Box>
              </TabContext>
            </Box>
          </Paper>

          <TextField
            sx={{ width: "100%" }} //, marginBottom: "1rem" }}
            id="standard-multiline-static"
            name="title"
            rows={3}
            placeholder="Title"
            variant="standard"
            onChange={val}
          />
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            name={value==="0"?"caption":"description"}
            rows={3}
            placeholder="What's on your mind?"
            variant="standard"
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
            onClick={handlClick}
          >
            <Button>Post</Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;
