import { Pets } from "@mui/icons-material";
import { AppBar, Avatar, Badge, Box, InputBase, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate, Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
	display: "flex",

	justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
	marginRight: "30px",
	backgroundColor: "#162035",
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
const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: "0 1em 0 1em",
	height: "100%",
	// position: 'absolute',
	pointerEvents: "none",
	flexDirection: "row",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: "white",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "white",
	"& .MuiInputBase-input": {
		// vertical padding + font size from searchIcon
		// paddingLeft: "1em",
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
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
  const [isHover,setIsHover]=useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
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
    <AppBar position="sticky" color="transparent" sx={{ backdropFilter: "blur(20px)", backgroundColor: "rgb(15, 23, 42,0.85)",justifyContent:"space-between",display:"flex",flexDirection:"column", }}>
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "flex" },justifyContent:"space-around",margin:"5px",alignItems:"center",
              }}>
          <Link
            to={"/"}
          style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "700",
              margin:"25px",
              alignItems:"center",
              justifyContent:"center",
              
            }}
            
          >
            Ask & Grow
            
          </Link>
          <Link
          
            to={"/"}
            style={{
              color:isHover===0?"#0C8CE9":"white",
              textDecoration: "none",
              
              margin:"25px",
              
            }}
            onMouseEnter={()=>setIsHover(0)}
            onMouseLeave={()=>setIsHover(null)}
          >
            Home
            
          </Link>

          <Link
            to={`/profile/${username}`}
           
            style={{
              color:isHover===1?"#0C8CE9":"white",
              textDecoration: "none",
              
              margin:"25px",
              

            }}
            onMouseEnter={()=>setIsHover(1)}
            onMouseLeave={()=>setIsHover(null)}
          >
            Profile
            
          </Link>

          <Link
            to={`/profile/${username}`}
           
            style={{
              color:isHover===2?"#0C8CE9":"white",
              textDecoration: "none",
              
              margin:"25px",
             
              

            }}
            onMouseEnter={()=>setIsHover(2)}
            onMouseLeave={()=>setIsHover(null)}
          >
            Post
            
          </Link>

          <Link
            to={`/profile/${username}`}
           
            style={{
              color:isHover===3?"#0C8CE9":"white",
              textDecoration: "none",
              
              margin:"25px"
             
              

            }}
            onMouseEnter={()=>setIsHover(3)}
            onMouseLeave={()=>setIsHover(null)}
          >
            Saved
            
          </Link>
        </Typography>

        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Search sx={{
           widht:"auto", marginLeft: "auto", alignItems: "center", display: 'flex',
          padding:"8px 0px 8px 0px"
        }}>
          <SearchIconWrapper >
            <SearchIcon  />
          </SearchIconWrapper>
          {searchOpen && 
          <StyledInputBase onClick={()=>{
            setSearchOpen(true)
          }}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />

          }
          
        </Search>


        <Icons>
          <Badge sx={{ cursor: "pointer", color: "white" }} onClick={handleChange}>
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
