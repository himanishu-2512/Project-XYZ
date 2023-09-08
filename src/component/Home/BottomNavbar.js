import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

const BottomNavbar = (props) => {
  const navigate = useNavigate();
  const username = window.localStorage.getItem("username");

  const [value, setValue] = useState(props.mode);
  
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backdropFilter: "blur(20px)",
        backgroundColor: "rgb(15, 23, 42,0.85)",
        zIndex: 999,
        display: { sm: "block", md: "none" },
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(e, val) => {
    setValue(val);}}
        sx={{
          backgroundColor: "transparent",
        }}
      >
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="home"
          value="home"
          icon={<HomeIcon />}
          onClick={() => {
            navigate(`/`);
          }}
        />
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="create"
          value="create"
          onClick={()=>{props.setOpen(!props.open); setValue(props.mode)}}
          icon={<AddBoxIcon />}
        />
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="profile"
          value="profile"
          onClick={() => navigate(`/profile/${username}`)}
          icon={<AccountCircleIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavbar;
