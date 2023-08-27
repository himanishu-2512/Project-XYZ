import {  Pets } from "@mui/icons-material";
import { AppBar, Avatar, Badge, Box, InputBase, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate, Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
	display: "flex",
	justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
	backgroundColor: "white",
	padding: "0 10px",
	borderRadius: theme.shape.borderRadius,
	width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
	display: "none",
	alignItems: "center",
	gap: "20px",
	[theme.breakpoints.up("sm")]: {
		display: "flex",
	},
}));

const UserBox = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: "10px",
	[theme.breakpoints.up("sm")]: {
		display: "none",
	},
}));
const Navbar = ({ setLoginUser, mode, setMode }) => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const username = window.localStorage.getItem("username")
	const handleChange = () => {
    setLoginUser({})
    window.localStorage.removeItem('isLoggedIn')
    window.localStorage.removeItem('userId')
	window.localStorage.removeItem('username')
    navigate('/')
  }
  const profileChange = () => {
	navigate(`/profile/${username}`);
  }
	return (
    <AppBar position="sticky" sx={{ background: "background.default" }}>
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          <Link
            to={"/"}
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Ask & Grow
          </Link>
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder="Search..." sx={{ color: "black" }} />
        </Search>
        <Icons>
          <Badge sx={{ cursor: "pointer" }} onClick={handleChange}>
            <LogoutIcon />
          </Badge>

          <Avatar sx={{ cursor: "pointer" }} onClick={profileChange}>
            {username ? username[0].toUpperCase() : null}
          </Avatar>
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Badge sx={{ cursor: "pointer" }} onClick={handleChange}>
            <LogoutIcon />
          </Badge>
          <Avatar sx={{ cursor: "pointer" }} onClick={profileChange}>
            {username ? username[0].toUpperCase() : null}
          </Avatar>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>&nbsp; &nbsp;Profile &nbsp; &nbsp;</MenuItem>
        {/* <MenuItem>Saved Posts</MenuItem> */}
        <MenuItem onClick={handleChange}>
          &nbsp; &nbsp;Logout &nbsp; &nbsp;
        </MenuItem>
      </Menu>
      {/* <div onClick={handleChange}></div> */}
    </AppBar>
  );
};

export default Navbar;
