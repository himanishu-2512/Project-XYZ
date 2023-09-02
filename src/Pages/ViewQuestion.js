import { Bookmark, Favorite, Image, MoreVert } from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Divider,
	IconButton,
	Menu,
	MenuItem,
	Modal,
	Paper,
	Skeleton,
	TextField,
	Typography,
	styled,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import AddComments from "../component/Home/Comments/AddComments";
import UserComments from "../component/Home/Comments/UserComments";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";

const SytledModal = styled(Modal)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

const ViewQuestion = () => {
	const [question, setQuestion] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [edit, setEdit] = useState(false);
	const [imageUrl, setImageUrl] = useState(null);
	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(0);
	const [saved, setSaved] = useState(false);
	const [comment, setComment] = useState([]);
	const [isAdded, setIsAdded] = useState(false);
	const [isUpdated, setIsUpdated] = useState(false);
	const [loading, setLoading] = useState(true);
	const [exists, setExists] = useState(true);

	const { questionId } = useParams();
	const navigate = useNavigate();

	console.log("COMMENTS:", comment);

	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const userId = window.localStorage.getItem("userId");
	const username = window.localStorage.getItem("username");

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/question/getquestion/${questionId}`);
				// console.log(response);
				if (!response.data.status) {
					setLoading(false);
					setExists(false);
					return;
				}
				setLikeCount(response.data.question.likes.length);
				if (response.data.question?.likes.includes(userId)) setLiked(true);
				if (response.data.question?.saved?.includes(userId)) setSaved(true);
				setQuestion(response.data.question);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchPost();
	}, [BASE_URL, questionId, userId, isUpdated]);

	useEffect(() => {
		handleComments(questionId);
		// eslint-disable-next-line
	}, [isAdded, questionId]);

	const handleAnchor = (e) => {
		setMenuOpen(true);
		setAnchorEl(e.currentTarget);
	};

	const handleAnchorClose = () => {
		setMenuOpen(false);
		setAnchorEl(null);
	};

	const handleEdit = () => {
		setMenuOpen(false);
		setEdit(true);
	};

	const handleDelete = async (id) => {
		setLoading(true);
		try {
			await axios.delete(`${BASE_URL}/question/deletequestion/${userId}/${id}`);
			setLoading(false);
			navigate("/");
		} catch (error) {
			toast.error(error, { pauseOnHover: "false" });
		}
	};

	const handleShare = (id) => {
		navigator.clipboard.writeText(`https://master--adorable-trifle-92330c.netlify.app/question/${id}`);
		toast.success("Link copied to clipboard", { pauseOnHover: "false" });
		setMenuOpen(false);
	};

	const val = (e) => {
		e.preventDefault();
		const { value, name } = e.target;
		if (name === "title") setTitle(value);
		else setDescription(value);
	};

	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setImageUrl(reader.result);
		};
		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const handleClickPost = (e, id) => {
		e.preventDefault();
		const updatedQuestion = { userId, title, description };
		if (title && description) {
			axios.post(`${BASE_URL}/question/updatequestion/${userId}/${id}`, updatedQuestion).then((res) => {
				toast.success(res.data.message, { pauseOnHover: "false" });
				setIsUpdated(!isUpdated);
			});
		} else {
			toast.warning("Question needs both a title and a description", { pauseOnHover: "false" });
		}
		setEdit("");
	};

	const handleLike = async (questionId) => {
		if (liked) setLikeCount(likeCount - 1);
		else setLikeCount(likeCount + 1);
		setLiked(!liked);
		await axios
			.post(`${BASE_URL}/like/question/${questionId}/${userId}`)
			.then((res) => {})
			.catch((error) => {
				toast.error(error, { pauseOnHover: "false" });
			});
	};

	const handleSave = async (questionId) => {
		const body = { userId };
		setSaved(!saved);
		await axios
			.post(`${BASE_URL}/question/questions/savequestions/${questionId}`, body)
			.then((res) => {})
			.catch((error) => {
				toast.error(error, { pauseOnHover: "false" });
			});
	};

	const handleComments = async (questionId) => {
		await axios
			.get(`${BASE_URL}/question/getquestionscomments/${questionId}`)
			.then((res) => {
				console.log("comment response:", res);
				setComment(res.data.questions.answers);
			})
			.catch((error) => {
				toast.error(error, { pauseOnHover: "false" });
			});
	};

	const writeComment = () => {
		return (
			<>
				<Divider sx={{ marginTop: 1 }} />
				<Box sx={{ paddingTop: 2, paddingX: 1 }}>
					<AddComments
						postId={question._id}
						setIsAdded={setIsAdded}
						isAdded={isAdded}
						setComments={setComment}
						comment={comment}
						type={"question"}
					/>
				</Box>
			</>
		);
	};

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

	if (loading)
		return (
			<Box
				sx={{
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Card
					sx={{
						width: {
							xs: "100%",
							sm: "80%",
							md: "90%",
							lg: "70%",
						},
						height: "90%",
						display: "flex",
					}}
				>
					<Box
						sx={{
							width: {
								xs: "100%",
								md: "50%",
							},
							display: "flex",
							flexDirection: "column",
						}}
					>
						<CardHeader
							avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
							action={null}
							title={<Skeleton animation="wave" height={10} width="60%" style={{ marginBottom: 6 }} />}
							subheader={<Skeleton animation="wave" height={10} width="40%" />}
						/>
						<Skeleton sx={{ flexGrow: 1 }} animation="wave" variant="rectangular" />

						<CardContent>
							<Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
							<Skeleton animation="wave" height={10} width="80%" />
						</CardContent>
					</Box>
					<Box
						sx={{
							width: "50%",
							display: {
								xs: "none",
								md: "flex",
							},
							flexDirection: "column",
							justifyContent: "center",
							overflow: "hidden",
						}}
					>
						{Array.from(Array(9)).map((el, index) => (
							<CardHeader
								avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
								action={null}
								title={<Skeleton animation="wave" height={10} width="90%" style={{ marginBottom: 6 }} />}
								subheader={<Skeleton animation="wave" height={10} width="30%" />}
								key={index}
								sx={{ paddingLeft: 10 }}
							/>
						))}
					</Box>
				</Card>
			</Box>
		);

	if (!exists)
		return (
			<Box sx={{ height: "100vh", display: "flex", alignItems: "center", flexDirection: "column", padding: 4 }}>
				<Typography variant="h4" sx={{ marginTop: 8 }}>
					Sorry, this page isn't available.
				</Typography>
				<Typography variant="h6" sx={{ marginTop: 6 }}>
					The link you followed may be broken, or the page may have been removed.
				</Typography>
				<Typography variant="subtitle2" sx={{ marginTop: 6 }}>
					<Link to={"https://master--adorable-trifle-92330c.netlify.app"} style={{ textDecoration: "none" }}>
						Go to homepage.
					</Link>
				</Typography>
			</Box>
		);

	return (
		<Box
			sx={{
				padding: 0,
				display: "flex",
				alignItems: {
					xs: "",
					sm: "center",
				},
				justifyContent: "center",
				height: {
					xs: "auto",
					md: "100vh",
				},
				boxSizing: "border-box",
			}}
		>
			<ToastContainer
				autoClose={2000}
				position={window.screen.width < 900 ? "top-center" : "bottom-right"}
				hideProgressBar
				theme="colored"
				transition={Slide}
			/>
			<Paper
				sx={{
					width: {
						xs: "100%",
						sm: "90%",
						lg: "70%",
					},
					variant: "outlined",
					height: {
						xs: "85%",
						sm: "75%",
						md: "90%",
					},
					borderRadius: "10px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: {
						xs: "column",
						md: "row",
					},
					marginTop: {
						xs: 0,
						sm: 4,
						md: 0,
					},
				}}
				elevation={window.screen.width < 600 ? 0 : 3}
			>
				<Box
					sx={{
						height: "100%",
						width: {
							xs: "100%",
							md: "50%",
						},
						display: "flex",
						flexDirection: "column",
					}}
				>
					<CardHeader
						avatar={
							<Avatar sx={{ bgcolor: blueGrey[500] }} aria-label="recipe">
								{question.userId.username[0].toUpperCase()}
							</Avatar>
						}
						action={
							<IconButton aria-label="settings" onClick={(e) => handleAnchor(e, question._id)}>
								<MoreVert />
							</IconButton>
						}
						title={question.userId.username}
						subheader={timeDemo(question.createdAt)}
					/>
					<Menu
						id="demo-positioned-menu"
						aria-labelledby="demo-positioned-button"
						open={menuOpen}
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
						{username && question.userId.username === username && (
							<MenuItem
								onClick={() => {
									setTitle(question.title);
									setDescription(question.description);
									handleEdit();
								}}
							>
								Edit
							</MenuItem>
						)}
						{username && question.userId.username === username && (
							<MenuItem onClick={() => handleDelete(question._id)}>Delete</MenuItem>
						)}

						<MenuItem onClick={() => handleShare(question._id)}>Share</MenuItem>
					</Menu>
					<SytledModal
						open={edit}
						onClose={() => {
							setEdit("");
							setTitle("");
							setDescription("");
							setImageUrl(null);
						}}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box
							width={400}
							bgcolor={"background.default"}
							color={"text.primary"}
							p={3}
							borderRadius={5}
							sx={{ display: "flex", flexDirection: "column", gap: 3 }}
						>
							<TextField
								sx={{ width: "100%" }}
								id="standard-multiline-static"
								name="title"
								value={title}
								placeholder="Title"
								variant="outlined"
								onChange={val}
							/>
							<TextField
								sx={{ width: "100%" }}
								id="standard-multiline-static"
								multiline
								value={description}
								name="description"
								rows={3}
								placeholder="What's on your mind?"
								variant="outlined"
								onChange={val}
							/>

							<label htmlFor="upload-image" style={{ backgroundColor: "lightyellow" }}>
								<Button
									variant="contained"
									component="span"
									sx={{
										backgroundColor: "transparent",
										"&:hover": { backgroundColor: "transparent" },
										color: "black",
										textTransform: "none",
										width: "100%",
									}}
								>
									Upload Image <Image color="secondary" sx={{ marginLeft: "8px" }} />
								</Button>
								<input id="upload-image" hidden accept="image/*" type="file" onChange={handleFileUpload} />
							</label>

							{imageUrl && (
								<>
									<Box
										width="auto"
										height={100}
										sx={{
											backgroundImage: `url(${imageUrl})`,
											backgroundPosition: "center",
											backgroundSize: "contain",
											backgroundRepeat: "no-repeat",
										}}
									></Box>
									<Button onClick={() => setImageUrl(null)}>remove image</Button>
								</>
							)}
							<ButtonGroup
								fullWidth
								variant="contained"
								aria-label="outlined primary button group"
								onClick={(e) => handleClickPost(e, question._id)}
							>
								<Button>Edit</Button>
							</ButtonGroup>
						</Box>
					</SytledModal>
					<Box
						sx={{
							overflowY: "scroll",
							"&::-webkit-scrollbar": {
								width: "5px",
								visibility: "hidden",
							},
							"&:hover": {},
							flexGrow: "1",
						}}
					>
						<CardContent sx={{}}>
							<Typography variant="body2" sx={{ marginTop: "0px", textDecoration: "none", textAlign: "left" }}>
								{question.description}
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
								image="/images/iiitr.png"
							/>
						</Box>
					</Box>
					<Divider sx={{ marginTop: 1 }} />
					<Box
						sx={{
							display: "flex",
						}}
					>
						<Button
							startIcon={<Favorite />}
							onClick={() => handleLike(question._id)}
							style={{ color: liked ? "red" : "black", padding: "0", width: "50%" }}
							disableRipple
						>
							{likeCount} {likeCount === 1 ? "like" : "likes"}
						</Button>
						<Divider orientation="vertical" />
						<Button
							startIcon={<Bookmark />}
							onClick={() => handleSave(question._id)}
							style={{ color: saved ? "blue" : "black", width: "50%" }}
						>
							Save
						</Button>
					</Box>
				</Box>
				<Divider
					orientation="vertical"
					sx={{
						display: {
							xs: "none",
							md: "block",
						},
					}}
				/>
				<Box
					sx={{
						height: "100%",
						width: {
							xs: "100%",
							md: "50%",
						},
						position: "relative",
						display: "flex",
						flexDirection: "column",
					}}
				>
					{window.screen.width < 900 ? writeComment() : ""}
					{window.screen.width < 900 ? <Divider /> : ""}
					<CardContent
						sx={{
							overflowY: "scroll",
							"&::-webkit-scrollbar": {
								width: "5px",
							},
							flexGrow: "1",
						}}
					>
						{comment?.length > 0 ? (
							comment.toReversed().map((items, index) => {
								return <UserComments answers={items} key={index} />;
							})
						) : (
							<Box sx={{ display: "flex", justifyContent: "center" }}>
								<Typography>No comments yet.</Typography>
							</Box>
						)}
					</CardContent>
					{window.screen.width > 900 ? writeComment() : ""}
				</Box>
			</Paper>
		</Box>
	);
};

export default ViewQuestion;
