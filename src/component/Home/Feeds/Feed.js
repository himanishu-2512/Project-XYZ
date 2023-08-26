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
	Menu,
	MenuItem,
	Link,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import { Favorite,  MoreVert } from "@mui/icons-material";
import { Box } from "@mui/system";
import CommentIcon from "@mui/icons-material/Comment";
import Button from "@mui/material/Button";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddComments from "../Comments/AddComments";
import UserComments from "../Comments/UserComments";

  const [isAdded, setIsAdded] = useState("");
  const [comment, setComment] = useState([]);
  //   console.log(comment.reverse())
  useEffect(() => {
    handleComments(open);
  }, [isAdded]);
  const handleComments = async (postId) => {
    console.log("yes");
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/post/getpostcomments/${postId}`)
      .then((res) => {
        setComment(res.data.post.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
    if (open === id) setOpen(null);
    else setOpen(id);
  }
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

	const [anchorEl, setAnchorEl] = useState(null);
	const [menuOpenId, setMenuOpenId] = useState(null);
	const handleAnchor = (e, id) => {
		setMenuOpenId(id);
		setAnchorEl(e.currentTarget);
	};
	const handleAnchorClose = () => {
		setMenuOpenId(null);
		setAnchorEl(null);
	};

	const timeDemo=(time)=>{
	var msPerMinute = 60 * 1000;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var msPerMonth = msPerDay * 30;
	var msPerYear = msPerDay * 365;

	var elapsed = new Date() - new Date(time);

	if (elapsed < msPerMinute) {
		 return Math.round(elapsed/1000) + ' seconds ago';   
	}

	else if (elapsed < msPerHour) {
		 return Math.round(elapsed/msPerMinute) + ' minutes ago';   
	}

	else if (elapsed < msPerDay ) {
		 return Math.round(elapsed/msPerHour ) + ' hours ago';   
	}

	else if (elapsed < msPerMonth) {
		return '' + Math.round(elapsed/msPerDay) + ' days ago';   
	}

	else if (elapsed < msPerYear) {
		return '' + Math.round(elapsed/msPerMonth) + ' months ago';   
	}

	else {
		return '' + Math.round(elapsed/msPerYear ) + ' years ago';   
	}
	}

	return (
		<Box sx={{ maxWidth: "100%", display: "flex", justifyContent: "center", flexDirection:"column" }}>
			{data.post?.toReversed().map((item, index) => {
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
							M.P
						</Avatar>
					}
					action={
						<IconButton aria-label="settings"  onClick={(e) => handleAnchor(e, item._id)}>
							<MoreVert />
						</IconButton>
					}
					title={item.userId.username.toUpperCase()}
					subheader={timeDemo(item.createdAt)}
				/>
        <Menu
					id="demo-positioned-menu"
					aria-labelledby="demo-positioned-button"
					open={item._id === menuOpenId}
					anchorEl={anchorEl}
					onClose={(e) => handleAnchorClose()}
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
				>
					<MenuItem>
						<Link style={{ textDecoration: "none", color: "black" }} to={"/Profile"}>
							Edit
						</Link>
					</MenuItem>
					<MenuItem>Delete</MenuItem>
					<MenuItem onClick={handleChange}>Share</MenuItem>
				</Menu>
				<CardContent sx={{}}>
					<Typography variant="body2" sx={{ marginTop: "0px", textDecoration: "none", textAlign: "left" }}>
						{item.caption}
					</Typography>
				</CardContent>
				<Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
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
onClick={() => {
                  handleChange(item._id);
                  handleComments(item._id);
                }}						aria-expanded={true}
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
				{open===item._id? true : false && <Divider maxWidth="90%" />}
				<Collapse in={open===item._id ? true : false } timeout="auto" unmountOnExit>
					<CardContent>
						<AddComments
            postId={item._id}
                  setIsAdded={setIsAdded}
                  isAdded={isAdded}
                  setComments={setComment}
                  comment={comment}
				  type={"post"}/>
						{comment.length > 0
                  ? comment.toReversed().map((items, index) => {
                      return <UserComments answers={items} key={index} />;
                    })
                  : ""}
					</CardContent>
				</Collapse>
			</Paper>)})}
		</Box>
	);
}



export default Feed;
