import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import {toast } from "react-toastify";
import axios from "axios";


function UserComments(props) {
  const {answers} = props;
  const userId = window.localStorage.getItem("userId")

  const handleClick = (e) => {
    props.type === "post" ? handleDeletePost(e) : handleDeleteQuestion(e);
  };

 const handleDeletePost=async(commentId)=>{
try {
   await axios
     .post(
       `${process.env.REACT_APP_BASE_URL}/comment/post/${props.postId}/${userId}/${commentId}/deletecomment`
     )
     .then((res) => {
       toast.success(res.data.message, { pauseOnHover: "false" });
       props.setIsAdded(!props.isAdded)
     });
} catch (error) {
  toast.error(error, { pauseOnHover: "false" });
}
 }
 const handleDeleteQuestion=async(commentId)=>{
try {
   await axios
     .post(
       `${process.env.REACT_APP_BASE_URL}/question/answer/deleteanswer/${userId}/${props.postId}/${commentId}`
     )
     .then((res) => {
       toast.success(res.data.message, { pauseOnHover: "false" });
       props.setIsAdded(!props.isAdded);
     });
} catch (error) {
  toast.error(error, { pauseOnHover: "false" });
}
 }
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
  

  return (
    <Box >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          mt: '10px',
          mb: '2px',
        }}
      >
        <Avatar />
        <Paper
          component="form"
          fullWidth
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            width: '87%',
            backgroundColor: '#4D5567',
            pl:0.5
          }}
        >
          <Box
            sx={{
              ml: '10px',
              mt: '10px',
              mb: '5px',
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: '550', color: 'white' }}
            >
              {answers.author.username}
            </Typography>
          </Box>

          <Box
            sx={{
              ml: '10px',
              mb: '5px',
            }}
          >
            <Typography variant="body2" sx={{ color: 'white', marginBottom: 0.5 }}>
              {answers.body}
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          ml: '50px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Button sx={{ margin: '0', color: '#42a5f5' }} size="small">
          Like
        </Button>
        {props.postOwnerId === userId || answers.author._id === userId ? (
          <Button
            sx={{ color: '#42a5f5' }}
            size="small"
            onClick={() => handleClick(answers._id)}
          >
            DELETE
          </Button>
        ) : (
          ''
        )}

        <Typography
          variant="body2"
          sx={{ fontWeight: 'light', ml: '10px', color: 'gray' }}
        >
          {timeDemo(answers.createdAt)}
        </Typography>
      </Box>
    </Box>
  )
}

export default UserComments;
