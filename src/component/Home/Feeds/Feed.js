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
import AddComments from'../Comments/AddComments'

function Feed() {
	//Like
	const [color, setColor] = useState(false);
	const handleLike = () => {
		setColor(!color);
	};

	//Comment
	const [open, setOpen] = useState(false);
	const handleChange = () => {
		setOpen(!open);
	};

	//Save
	const [save, setSave] = useState(false);
	const handleSave = () => {
		setSave(!save);
	};

	const [expand, setExpand] = useState(false);
	const handleExpand = () => {
		setExpand(true);
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				flexWrap: "wrap",
				width: { xs: "100%", md: "90%" },
			}}
		>
			<Paper
				sx={{
					maxWidth: "100%",
					variant: "outlined",
					maxHeight: "100%",
					borderRadius: {
						xs: "0px",
						sm: "10px",
					},
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
					title="Vishnu Priye"
					subheader="September 14, 2016"
				/>
				<CardContent sx={{}}>
					<Typography variant="body2" sx={{ marginTop: "0px", textDecoration: "none", textAlign: "left" }}>
						This impressive paella is a perfect party dish and a fun meal to cook together with your guests.
						Add 1 cup of frozen peas along with the mussels, if you like.
					</Typography>
				</CardContent>
				<Box sx={{ display: "flex", justifyContent: "center", position: "relative", paddingX: "1%" }}>
					<Collapse in={expand} collapsedSize={"4rem"} timeout={500}>
						<CardMedia
							sx={{
								display: "block",
								maxWidth: "450px",
								maxHeight: "450px",
								width: "100%",
								height: "100%",
							}}
							component="img"
							image="images/doodle2_left.jpg"
						/>
					</Collapse>
					<Overlay id={`${expand}`}>
						<Box onClick={handleExpand} sx={{ cursor: "pointer" }}>
							<KeyboardArrowDown
								sx={{
									color: "white",
									filter: "drop-shadow(0px 0px 3px black)",
									fontSize: "30px",
								}}
							/>
						</Box>
					</Overlay>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
					<Typography variant="body2" sx={{ marginLeft: "2%" }}>
						{" "}
						9 likes
					</Typography>
					<Typography variant="body2" sx={{ marginRight: "2%" }}>
						10 comments
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
						onClick={() => handleLike()}
						style={{ color: color ? "red" : "black" }}
					>
						Like
					</Button>
					<Button
						startIcon={<CommentIcon />}
						sx={{ color: "black" }}
						expand={open}
						onClick={() => handleChange()}
						aria-expanded={true}
						aria-label="show more"
					>
						Comment
					</Button>
					<Button
						startIcon={<BookmarkIcon />}
						onClick={() => handleSave()}
						style={{ color: save ? "blue" : "black" }}
					>
						Save
					</Button>
				</Box>
				{open && <Divider maxWidth="90%" />}
				<Collapse in={open} timeout="auto" unmountOnExit>
					<CardContent>
						<AddComments/>
					</CardContent>
				</Collapse>
			</Paper>
			<Paper
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
					title="Vishnu Priye"
					subheader="September 14, 2016"
				/>
				<CardContent sx={{}}>
					<Typography variant="body2" sx={{ marginTop: "0px", textDecoration: "none", textAlign: "left" }}>
						This impressive paella is a perfect party dish and a fun meal to cook together with your guests.
						Add 1 cup of frozen peas along with the mussels, if you like.
					</Typography>
				</CardContent>
				<Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
					<Collapse in={expand} collapsedSize={"4rem"} timeout={500}>
						<CardMedia
							sx={{
								display: "block",
								maxWidth: "450px",
								maxHeight: "450px",
								width: "100%",
								height: "100%",
							}}
							component="img"
							image="images/doodle2_left.jpg"
						/>
					</Collapse>
					<Overlay id={`${expand}`}>
						<Box onClick={handleExpand} sx={{ cursor: "pointer" }}>
							<KeyboardArrowDown
								sx={{
									color: "white",
									filter: "drop-shadow(0px 0px 3px black)",
									fontSize: "30px",
								}}
							/>
						</Box>
					</Overlay>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
					<Typography variant="body2" sx={{ marginLeft: "2%" }}>
						{" "}
						9 likes
					</Typography>
					<Typography variant="body2" sx={{ marginRight: "2%" }}>
						10 comments
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
						onClick={() => handleLike()}
						style={{ color: color ? "red" : "black" }}
					>
						Like
					</Button>
					<Button
						startIcon={<CommentIcon />}
						sx={{ color: "black" }}
						expand={open}
						onClick={() => handleChange()}
						aria-expanded={true}
						aria-label="show more"
					>
						Comment
					</Button>
					<Button
						startIcon={<BookmarkIcon />}
						onClick={() => handleSave()}
						style={{ color: save ? "blue" : "black" }}
					>
						Save
					</Button>
				</Box>
				{open && <Divider maxWidth="90%" />}
				<Collapse in={open} timeout="auto" unmountOnExit>
					<CardContent>
						<AddComments/>
					</CardContent>
				</Collapse>
			</Paper>
			<Paper
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
					title="Vishnu Priye"
					subheader="September 14, 2016"
				/>
				<CardContent sx={{}}>
					<Typography variant="body2" sx={{ marginTop: "0px", textDecoration: "none", textAlign: "left" }}>
						This impressive paella is a perfect party dish and a fun meal to cook together with your guests.
						Add 1 cup of frozen peas along with the mussels, if you like.
					</Typography>
				</CardContent>
				<Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
					<Collapse in={expand} collapsedSize={"4rem"} timeout={500}>
						<CardMedia
							sx={{
								display: "block",
								maxWidth: "450px",
								maxHeight: "450px",
								width: "100%",
								height: "100%",
							}}
							component="img"
							image="images/doodle2_left.jpg"
						/>
					</Collapse>
					<Overlay id={`${expand}`}>
						<Box onClick={handleExpand} sx={{ cursor: "pointer" }}>
							<KeyboardArrowDown
								sx={{
									color: "white",
									filter: "drop-shadow(0px 0px 3px black)",
									fontSize: "30px",
								}}
							/>
						</Box>
					</Overlay>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
					<Typography variant="body2" sx={{ marginLeft: "2%" }}>
						{" "}
						9 likes
					</Typography>
					<Typography variant="body2" sx={{ marginRight: "2%" }}>
						10 comments
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
						onClick={() => handleLike()}
						style={{ color: color ? "red" : "black" }}
					>
						Like
					</Button>
					<Button
						startIcon={<CommentIcon />}
						sx={{ color: "black" }}
						expand={open}
						onClick={() => handleChange()}
						aria-expanded={true}
						aria-label="show more"
					>
						Comment
					</Button>
					<Button
						startIcon={<BookmarkIcon />}
						onClick={() => handleSave()}
						style={{ color: save ? "blue" : "black" }}
					>
						Save
					</Button>
				</Box>
				{open && <Divider maxWidth="90%" />}
				<Collapse in={open} timeout="auto" unmountOnExit>
					<CardContent>
						<AddComments/>
					</CardContent>
				</Collapse>
			</Paper>
		</Box>
	);
}

const Overlay = styled.div`
	width: 100%;
	height: 100%;
	background: linear-gradient(#fff, #b1b9c485);
	color: black;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	transition: opacity 0.5s;

	${(props) => (props.id === "true" ? `opacity:0` : ``)}
`;

export default Feed;
