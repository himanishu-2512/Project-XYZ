import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import React from "react";

function UserComments() {
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
              Kunal Chaurasia
            </Typography>
          </Box>
          <Box
            sx={{
              ml: "10px",
              mb: "5px",
            }}
          >
            <Typography variant="body2" sx={{}}>
              This is my comment.
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
        <Typography variant="body2" sx={{ fontWeight: "light", ml: "10px" }}>
          5h
        </Typography>
      </Box>

      {/* //Comment 2 */}

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
                Prakhar Srivastav
              </Typography>
            </Box>
            <Box
              sx={{
                ml: "10px",
                mb: "5px",
              }}
            >
              <Typography variant="body2" sx={{}}>
                This is his comment.
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
          <Typography variant="body2" sx={{ fontWeight: "light", ml: "10px" }}>
            7h
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default UserComments;
