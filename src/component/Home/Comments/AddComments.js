import { Avatar, Box } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import GifIcon from "@mui/icons-material/Gif";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { useState,useEffect } from "react";
import axios from "axios";
import { useRef } from "react";


function Comments(props) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [comment, setComment] = useState("");
  const input=useRef(null)
 
// console.log(props)
const handleClick = (e) => {
props.type === "post"? handleClickPost(e) : handleClickQuestion(e)
}
  const Id = localStorage.getItem("userId");

  const val = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleClickPost = (e) => {
    e.preventDefault();
    const body ={"body" : comment};
    if (Id && props.postId && comment) {
      axios
        .post(
          `${BASE_URL}/comment/post/${props.postId}/${Id}/newcomment`,
          body
        )
        .then((res) => {
          
          alert(res.data.message);
          props.setIsAdded(!(props.isAdded));
          input.current.firstChild.value="";
          console.log(props.isAdded)
        });
    } else {
      alert("No empty comments");
    }
    
  };
  const handleClickQuestion = (e) => {
    e.preventDefault();
    const body ={"body" : comment};
    if (Id && props.postId && comment) {
      axios
        .post(
          `${BASE_URL}/question/answer/newanswer/${Id}/${props.postId}`,
          body
        )
        .then((res) => {
          alert(res.data.message);
          props.setIsAdded(!props.isAdded);
          input.current.firstChild.value = "";
          console.log(props.isAdded);
        });
    } else {
      alert("No empty answers");
    }
    
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Avatar />
        <Paper
          component="form"
          fullWidth
          sx={{ display: "flex", alignItems: "center", width: "87%" }}
        >
          <InputBase
          ref={input}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Write a comment..."
            inputProps={{ "aria-label": "write a comment..." }}
            onChange={(e)=>val(e)}
            name = "body"
          />
          <IconButton
            type="button"
            color="primary"
            sx={{ p: "10px" }}
            aria-label="send"
            onClick={(e)=>handleClick(e)}
          >
            <SendIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: "10px" }} aria-label="Add image">
            <CameraAltIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: "10px" }} aria-label="Add GIF">
            <GifIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box
        sx={{
          mt: "20px",
        }}
      ></Box>
    </Box>
  );
}

export default Comments;
