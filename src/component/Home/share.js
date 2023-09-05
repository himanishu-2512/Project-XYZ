import axios from "axios";
import { toast } from "react-toastify";
import { Button, ButtonGroup, Fab, Modal, styled, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Add as AddIcon, Image } from "@mui/icons-material";
import { Box } from "@mui/system";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Paper } from "@mui/material";

const SytledModal = styled(Modal)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	background: "#4b5561BB",
	backdropFilter: "blur(5px)",
});

const Add = (props) => {
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const [open, setOpen] = useState(false);
	const [post, setPost] = useState({});
	const [value, setValue] = useState("0");
	const Id = localStorage.getItem("userId");

	//image upload
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [imageUrl, setImageUrl] = useState(null);

	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		// const formData = new FormData();
		// formData.append("image", file);

		reader.onloadend = () => {
			setImageUrl(reader.result);
			console.log(value);
		};
		if (file) {
			reader.readAsDataURL(file);
		}
	};
	const remove = () => {
		setImageUrl(null);
	};
	//image upload

	const val = (e) => {
		e.preventDefault();
		const { value, name } = e.target;
		setPost(() => {
			return {
				...post,
				[name]: value,
				userId: Id,
			};
		});
	};
	const handlClick = (e) => {
		if (value === "0") {
			handlClickPost(e);
		} else {
			handlClickQuestion(e);
		}
	};

	const handlClickPost = (e) => {
		e.preventDefault();
		const { userId, title, caption } = post;
		if (userId && title && caption) {
			axios.post(`${BASE_URL}/post/newpost`, post).then((res) => {
				toast.success(res.data.message);
				props.setCreate(!props.create);
			});
		} else {
			toast.warning("Post needs both a title and a caption", { pauseOnHover: "false" });
		}
		setOpen(false);
	};

	const handlClickQuestion = (e) => {
		e.preventDefault();
		const { userId, title, description } = post;
		if (userId && title && description) {
			axios.post(`${BASE_URL}/question/newquestion`, post).then((res) => {
				toast.success(res.data.message);
				props.setCreate(!props.create);
			});
		} else {
			toast.warning("Question needs both a title and a description", { pauseOnHover: "false" });
		}
		setOpen(false);
	};

	return (
		<>
			<Tooltip
				onClick={(e) => setOpen(true)}
				title="Add Post"
				sx={{
					position: "fixed",
					bottom: 20,
					left: { xs: "calc(50% - 25px)", md: 30 },
				}}
			>
				<Fab color="primary" aria-label="add">
					<AddIcon />
				</Fab>
			</Tooltip>
			<SytledModal
				open={open}
				onClose={(e) => {
					setOpen(false);
					setPost({});
					setImageUrl(null);
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					width={500}
					bgcolor={"background.default"}
					color={"text.primary"}
					p={3}
					borderRadius={5}
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 5,
						backgroundColor: "#0F172A",
						border: "2px solid rgb(29,35,43)",
					}}
				>
					<Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
						<Box sx={{ width: "100%", typography: "body1", backgroundColor: "#1E293B", borderRadius: "5px" }}>
							<TabContext value={value}>
								<Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center" }}>
									<TabList onChange={handleChange} aria-label="lab API tabs example">
										<Tab sx={{ color: "white" }} label="Create Post" value="0" />
										<Tab sx={{ color: "white" }} label="Ask a Question" value="1" />
									</TabList>
								</Box>
							</TabContext>
						</Box>
					</Paper>

					<TextField
						sx={{
							width: "100%",
							backgroundColor: "rgba(71, 130, 182, 0.50)",
							borderRadius: "5px",
							input: { color: "#f4f6f8" },
						}}
						id="outlined-static"
						variant="outlined"
						name="title"
						rows={3}
						placeholder="Title"
						onChange={val}
					/>
					<TextField
						sx={{
							width: "100%",
							backgroundColor: "rgba(71, 130, 182, 0.50)",
							borderRadius: "5px",
							textarea: { color: "#f4f6f8" },
						}}
						id="standard-multiline-static"
						multiline
						name={value === "0" ? "caption" : "description"}
						rows={3}
						placeholder="What's on your mind?"
						variant="outlined"
						onChange={val}
					/>

					<label
						htmlFor="upload-image"
						style={{ backgroundColor: "rgba(31, 90, 142, 0.80)", borderRadius: "5px", color: "white" }}
					>
						<Button
							variant="contained"
							component="span"
							sx={{
								backgroundColor: "transparent",
								"&:hover": { backgroundColor: "transparent" },
								// display: "inline"
								color: "white",
								textTransform: "none",
								width: "100%",
							}}
						>
							Upload Image <Image color="primary" sx={{ marginLeft: "8px" }} />
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
							<Button onClick={() => remove()}>remove image</Button>
						</>
					)}
					<ButtonGroup
						// sx={{ marginTop: "5px" }}
						fullWidth
						variant="contained"
						aria-label="outlined primary button group"
						onClick={handlClick}
					>
						<Button>Post</Button>
					</ButtonGroup>
				</Box>
			</SytledModal>
		</>
	);
};

export default Add;
