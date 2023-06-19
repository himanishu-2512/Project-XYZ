import { Mail, Notifications, Pets } from "@mui/icons-material";
import { AppBar, Avatar, Badge, Box, InputBase, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";

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
	const handleChange = () => {
    setLoginUser({})
    window.localStorage.removeItem('isLoggedIn')
    window.localStorage.removeItem('userId')
    navigate('/')
  }
	return (
		<AppBar position="sticky" sx={{ background: "background.default" }}>
			<StyledToolbar>
				<Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
					Project Name
				</Typography>
				<Pets sx={{ display: { xs: "block", sm: "none" } }} />
				<Search>
					<InputBase placeholder="Search..." sx={{ color: "black" }} />
				</Search>
				<Icons>
					<DarkModeIcon onClick={(e) => setMode(mode === "light" ? "dark" : "light")} />
					<Badge badgeContent={4} color="error">
						<Mail />
					</Badge>
					<Badge badgeContent={2} color="error">
						<Notifications />
					</Badge>
					<Avatar sx={{ width: 30, height: 30 }} src="" onClick={(e) => setOpen(true)} />
				</Icons>
				<UserBox onClick={(e) => setOpen(true)}>
					<Avatar sx={{ width: 30, height: 30 }} src="" />
					<Typography variant="span">Kunal</Typography>
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
				<MenuItem>Profile</MenuItem>
				<MenuItem>Saved Posts</MenuItem>
				<MenuItem onClick={handleChange}>Logout</MenuItem>
			</Menu>
			{/* <div onClick={handleChange}></div> */}
		</AppBar>
	);
};

export default Navbar;
