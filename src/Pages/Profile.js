import React, { useCallback, useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import NavBar from "../component/Home/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import UserInfo from "../component/Profile/UserInfo";
import UserPosts from "../component/Profile/UserPosts";
import { Edit, PersonAdd } from "@mui/icons-material";
import axios from "axios";

function Profile({ setLoginUser }) {
	const BASE_URL = process.env.REACT_APP_BASE_URL
	const [edit, setEdit] = useState(false);
	const [user, setUser] = useState();
	let id = window.localStorage.getItem("userId");

	const fetchUser = useCallback(async () => {
		try {
			const userInfo = await axios.get(`${BASE_URL}/auth/user/${id}`);
			setUser(userInfo.data.user);
		} catch (error) {
			console.log(error);
		}
	}, [BASE_URL, id]);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	const handleChange = (e) => {
		e.preventDefault();
		const { value, name } = e.target;
		setUser(() => {
			return {
				...user,
				[name]: value,
			};
		});
	};
	const handleSave = async (e) => {
		e.preventDefault();
		const updatedUser = await axios.post(`${BASE_URL}/auth/updateuser/${id}`, user);
		setEdit(false);
		setUser(updatedUser.data.userUp);
	};

	const handleCancel = () => {
		fetchUser();
		setEdit(false);
	};

	return (
		<>
			{user && (
				<div>
					<Box>
						<NavBar />
						<Container component="main" maxWidth="md">
							<CssBaseline />
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "flex-end",
									alignItems: "center",
								}}
							>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										width: "30%",
									}}
								>
									<Avatar alt="" src="" sx={{ width: 100, height: 100, margin: 2 }} />
								</Box>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										alignItems: "right",
										width: "70%",
									}}
								>
									<Box
										sx={{
											marginTop: 2,
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Box
											sx={{
												margin: 1,
												display: "flex",
												flexDirection: "column",
												alignItems: "left",
											}}
										>
											<Box
												sx={{
													width: "100%",
												}}
											>
												<TextField
													id="outlined-static"
													value={user.name}
													name="name"
													label={edit ? "Name" : ""}
													fullWidth={true}
													onChange={handleChange}
													InputProps={{
														readOnly: !edit,
													}}
													sx={{
														fieldset: !edit ? { border: "none" } : {},
														fontWeight: "bold",
														input: {
															fontWeight: "bold",
															paddingX: !edit ? "0" : "",
														},
														label: {
															fontWeight: "bold",
														},
													}}
												/>
											</Box>
											<Typography
												variant="body2"
												sx={{
													color: "rgb(80,80,80)",
													marginTop: !edit ? "-15px" : "10px",
												}}
											>
												{user.username}
											</Typography>
										</Box>
										<Box sx={{ marginLeft: "auto", display: "flex", flexDirection: "column" }}>
											{true && (
												<>
													<Button variant="outlined">
														<Typography variant="caption">Following</Typography>
													</Button>
												</>
											)}
											{true && (
												<Button variant="outlined">
													<PersonAdd />
													<Typography variant="caption">Follow</Typography>
												</Button>
											)}
											{true && (
												<>
													<Button variant="outlined" onClick={() => setEdit(true)}>
														<Edit />
														<Typography variant="caption">Edit</Typography>
													</Button>
												</>
											)}
										</Box>
									</Box>
									<Box
										sx={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Box
											sx={{
												margin: 1,
												display: "flex",
												flexDirection: "row",
												alignItems: "center",
											}}
										>
											<Typography component="h1" variant="body2" sx={{ fontWeight: "bold" }}>
												{user.posts.length + user.questions.length}
											</Typography>
											<Typography component="h1" variant="body2" sx={{ marginLeft: "5px" }}>
												Posts
											</Typography>
										</Box>
										<Box
											sx={{
												margin: 1,
												display: "flex",
												flexDirection: "row",
												alignItems: "center",
											}}
										>
											<Typography
												component="h1"
												variant="body2"
												sx={{ marginLeft: "5px", fontWeight: "bold" }}
											>
												{user.following.length}
											</Typography>
											<Typography component="h1" variant="body2" sx={{ marginLeft: "5px" }}>
												Following
											</Typography>
										</Box>
										<Box
											sx={{
												margin: 1,
												display: "flex",
												flexDirection: "row",
												alignItems: "center",
											}}
										>
											<Typography
												component="h1"
												variant="body2"
												sx={{ marginLeft: "5px", fontWeight: "bold" }}
											>
												200
											</Typography>
											<Typography component="h1" variant="body2" sx={{ marginLeft: "5px" }}>
												Followers
											</Typography>
										</Box>
									</Box>
									<Box
										sx={{
											margin: 1,
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Box
											sx={{
												width: "100%",
											}}
										>
											<TextField
												id="outlined-multiline-static"
												name="bio"
												label={edit ? "Bio" : ""}
												multiline
												value={user.bio}
												onChange={handleChange}
												fullWidth={true}
												InputProps={{
													readOnly: !edit,
												}}
												sx={{
													fieldset: !edit ? { border: "none" } : {},
													".MuiInputBase-root": {
														paddingBottom: !edit ? "0" : "",
														paddingX: !edit ? "0" : "",
													},
													label: {
														fontWeight: "bold",
													},
												}}
											/>
										</Box>
									</Box>
								</Box>
							</Box>
							<Box sx={{ marginX: "5%" }}>
								<UserInfo checked={edit} user={user} setUser={setUser} />
							</Box>
							{edit && (
								<>
									<Button variant="outlined" onClick={handleSave}>
										<Typography variant="caption">Save</Typography>
									</Button>
									<Button variant="outlined" onClick={handleCancel}>
										<Typography variant="caption">Cancel</Typography>
									</Button>
								</>
							)}
							<Divider />
							<UserPosts />
						</Container>
					</Box>
				</div>
			)}
		</>
	);
}

export default Profile;
