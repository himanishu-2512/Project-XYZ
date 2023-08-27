import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import React from "react";

function UserComments(props) {
  const {answers} = props;

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
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          mt: "10px",
          mb: "2px",
        }}
      >
        <Avatar />
        <Paper
          component="form"
          fullWidth
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            width: "87%",
          }}
        >
          <Box
            sx={{
              ml: "10px",
              mt: "10px",
              mb: "5px",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "550" }}>
              {answers.author.username}
            </Typography>
          </Box>
          <Box
            sx={{
              ml: "10px",
              mb: "5px",
            }}
          >
            <Typography variant="body2" sx={{}}>
              {answers.body}
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          ml: "50px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button sx={{ margin: "0" }} size="small">
          Like
        </Button>
        <Button size="small">reply</Button>
        <Typography variant="body2" sx={{ fontWeight: "light", ml: "10px", color:"gray"}}>
          {timeDemo(answers.createdAt)}
        </Typography>
      </Box>
    </Box>
  );
}

export default UserComments;
