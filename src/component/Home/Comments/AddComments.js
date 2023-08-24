import { Avatar, Box } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import GifIcon from "@mui/icons-material/Gif";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

function Comments() {
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
            sx={{ ml: 1, flex: 1 }}
            placeholder="Write a comment..."
            inputProps={{ "aria-label": "write a comment..." }}
          />
          <IconButton
            type="button"
            color="primary"
            sx={{ p: "10px" }}
            aria-label="send"
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
      >
      </Box>
    </Box>
  );
}

export default Comments;
