import {
	Avatar,
	CardContent,
	CardHeader,
	CardMedia,
	Collapse,
	IconButton,
	Typography,
	Paper,
	Divider,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React, { useState } from "react";
import { Favorite, KeyboardArrowDown, MoreVert } from "@mui/icons-material";
import { Box } from "@mui/system";
import CommentIcon from "@mui/icons-material/Comment";
import Button from "@mui/material/Button";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import styled from "styled-components";
import AddComments from'../Home/Comments/AddComments'
import UserComments from'../Home/Comments/UserComments'

function Feed({data, username}) {

	//Like
	const [color, setColor] = useState([]);
	const handleLike = async (id) => {
		//console.log(id)
		const newIndex = color.indexOf(id);
		if (newIndex > -1) { 
			setColor(color.filter(e => e !== id));
			// //console.log(color)
		  }
		else
		setColor(color.concat(id));
		//console.log(newIndex, color)
	};

	//Comment
	const [open, setOpen] = useState([]);
	const handleChange = (id) => {
		var index = open.indexOf(id);
		if (index > -1) {
			setOpen(open.filter(e => e !== id))
			//console.log(id)
		} else {
			setOpen(open.concat(id))
		}
		//console.log(open)
	};

	//Save
	const [save, setSave] = useState([]);
	const handleSave = (id) => {
		var index = save.indexOf(id);
		if (index > -1) {
			setSave(save.filter(e => e !== id))
			//console.log(id)
		} else {
			setSave(save.concat(id))
		}
	};

	const [expand, setExpand] = useState([]); 
	const handleExpand = (id) => {
		var index = expand.indexOf(id);
		if (index > -1) {
			setExpand(expand.filter(e => e !== id))
			//console.log(id)
		} else {
			setExpand(expand.concat(id))
		}
	};

	return (
		<Box sx={{ maxWidth: "100%", display: "flex", justifyContent: "center", flexDirection:"column" }}>
			{data?.toReversed().map((item, index) => {
			return (<Paper
				sx={{
					maxWidth: "100%",
					variant: "outlined",
					maxHeight: "100%",
					borderRadius: "10px",
					marginBottom: "20px",
				}}
				elevation={3}
			>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: blueGrey[500] }} aria-label="recipe">
							V.P
						</Avatar>
					}
					action={
						<IconButton aria-label="settings">
							<MoreVert />
						</IconButton>
					}
					title={username?.toUpperCase()}
					subheader={item.createdAt.split("T")[0] + " " + item.createdAt.split("T")[1].split(".")[0]}
				/>
				<CardContent sx={{}}>
					<Typography variant="body2" sx={{ marginTop: "0px", textDecoration: "none", textAlign: "left" }}>
						{item.caption}
					</Typography>
				</CardContent>
				<Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
					<Collapse in={expand.includes(item._id) ? true : false} collapsedSize={"3rem"} timeout={500}>
						<CardMedia
							sx={{
								display: "block",
								maxWidth: "450px",
								maxHeight: "450px",
								width: "100%",
								height: "100%",
							}}
							component="img"
							image="images/iiitr.png"
						/>
					</Collapse>
					<Overlay id={`${expand}`}>
						<Box onClick={()=>handleExpand(item._id)} sx={{ cursor: "pointer" }}>
							<KeyboardArrowDown sx={{ color: "white" }} />
						</Box>
					</Overlay>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
					<Typography variant="body2" sx={{ marginLeft: "2%" }}>
						{" "}
						{item.likes.length} likes
					</Typography>
					<Typography variant="body2" sx={{ marginRight: "2%" }}>
						{item.comments.length} Comments
					</Typography>
				</Box>
				<Divider />
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-evenly",
					}}
				>
					<Button
						startIcon={<Favorite />}
						onClick={() => handleLike(item._id)}
						style={{ color: color.includes(item._id) ? "red" : "black" }}
					>
						Like
					</Button>
					<Button
						startIcon={<CommentIcon />}
						sx={{ color: "black" }}
						onClick={() => handleChange(item._id)}
						aria-expanded={true}
						aria-label="show more"
					>
						Comment
					</Button>
					<Button
						startIcon={<BookmarkIcon />}
						onClick={() => handleSave(item._id)}
						style={{ color: save.includes(item._id) ? "blue" : "black" }}
					>
						{save.includes(item._id) ? "Saved" : "Save"}
					</Button>
				</Box>
				{open.includes(item._id) ? true : false && <Divider maxWidth="90%" />}
				<Collapse in={open.includes(item._id) ? true : false } timeout="auto" unmountOnExit>
					<CardContent>
						<AddComments/>
						{item.comments.map((items, index) => {
			return (
						<UserComments answers={items} />)})}
					</CardContent>
				</Collapse>
			</Paper>)})}
		</Box>
	);
}

const Overlay = styled.div`
	width: 100%;
	height: 100%;
	background: linear-gradient(#f5f7fa95, #b1b9c495);
	color: black;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	transition: opacity 0.5s;

	${(props) => (props.id === "true" ? `opacity:0` : ``)}
`;

export default Feed;
