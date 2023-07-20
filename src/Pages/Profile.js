import React, { useCallback, useEffect, useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import NavBar from "../component/Home/Header";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import UserInfo from "../component/Profile/UserInfo";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { blue, green, red } from "@mui/material/colors";

function Profile({ setLoginUser }) {
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const [edit, setEdit] = useState(false);
	const [user, setUser] = useState();
	const [view, setView] = useState("profile");
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
						<NavBar setLoginUser={setLoginUser} />
						<Box sx={{ display: "flex" }}>
							<Stack sx={{ width: "20%", height: "50vh", position: "sticky", top: "8%", paddingTop: "2rem" }}>
								<Button
									sx={{
										justifyContent: "flex-start",
									}}
									disableRipple
									onClick={() => setView("profile")}
								>
									<Typography
										sx={{
											marginLeft: "2rem",
											padding: "0.5rem 1rem",
											fontSize: "1.5em",
											textTransform: "none",
											color: view === "profile" ? "blue[300]" : "rgb(100, 100, 100)",
										}}
									>
										Profile
									</Typography>
								</Button>
								<Button
									disableRipple
									sx={{
										justifyContent: "flex-start",
									}}
									onClick={() => setView("posts")}
								>
									<Typography
										sx={{
											marginLeft: "2rem",
											padding: "0.5rem 1rem",
											fontSize: "1.5em",
											textTransform: "none",
											color: view === "posts" ? "blue[300]" : "rgb(100, 100, 100)",
										}}
									>
										Posts
									</Typography>
								</Button>
								<Button
									disableRipple
									sx={{
										justifyContent: "flex-start",
									}}
									onClick={() => setView("saved")}
								>
									<Typography
										sx={{
											marginLeft: "2rem",
											padding: "0.5rem 1rem",
											fontSize: "1.5em",
											textTransform: "none",
											color: view === "saved" ? "blue[300]" : "rgb(100, 100, 100)",
										}}
									>
										Saved
									</Typography>
								</Button>
							</Stack>

							<Box sx={{ width: "80%", padding: "2em 3em 0 3em" }}>
								{view === "profile" && (
									<>
										<Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "2em" }}>
											<Typography variant="h4">Profile</Typography>
											<Button
												onClick={() => setEdit(true)}
												disableRipple
												sx={{
													border: "solid 1px rgba(200,200,200,0.7)",
													borderRadius: "2em",
													color: "rgb(100,100,100)",
													"&:hover": {
														color: blue[400],
														borderColor: blue[400],
														backgroundColor: "transparent",
													},
												}}
											>
												<Edit sx={{ marginRight: "5px" }} />
												Edit Profile
											</Button>
										</Box>
										<Box
											sx={{
												border: "solid 2px rgba(200,200,200,0.7)",
												borderRadius: "1em",
												padding: "1.5em",
												display: "flex",
												alignItems: "center",
											}}
										>
											<Avatar
												alt={user.name}
												src="/link-here"
												sx={{ height: 150, width: 150, fontSize: "3rem", marginLeft: "0.5em" }}
											/>
											<Box sx={{ flexGrow: 7, marginX: "3em" }}>
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
														input: {
															fontSize: "2rem",
															fontWeight: "bold",
															paddingX: !edit ? "0" : "",
															paddingY: edit ? "1rem" : 0,
														},
														label: {
															fontWeight: "bold",
														},
													}}
												/>
												<Typography sx={{ color: "rgb(100, 100, 100)", marginY: edit ? "1em" : "" }}>
													{user.username}
												</Typography>
												<TextField
													id="outlined-multiline-static"
													name="bio"
													label={edit ? "Bio" : ""}
													multiline
													maxRows={edit ? 5 : ""}
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
											<Box sx={{ flexGrow: 3, display: "flex", flexDirection: "column" }}>
												<Typography>
													<span style={{ fontWeight: "bold" }}>{user.posts.length + user.questions.length}</span> Posts
												</Typography>
												<Typography>
													<span style={{ fontWeight: "bold" }}>{user.followerCount.length}</span> Followers
												</Typography>
												<Typography>
													<span style={{ fontWeight: "bold" }}>{user.following.length}</span> Following
												</Typography>

												{/* {true && (
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
                      )} */}
											</Box>
										</Box>
										<UserInfo checked={edit} user={user} setUser={setUser} />
										{edit && (
											<Box sx={{ display: "flex", gap: 2, marginBottom: "2em", justifyContent: "flex-end" }}>
												<Button
													variant="outlined"
													onClick={handleSave}
													sx={{
														border: "solid 2px ",
														borderColor: green[700],
														borderRadius: "2em",
														color: green[700],
														"&:hover": {
															color: green[500],
															borderWidth: "2px",
															borderColor: green[500],
															backgroundColor: green[50],
														},
													}}
													disableRipple
												>
													<Typography variant="subtitle2">Save</Typography>
												</Button>
												<Button
													variant="outlined"
													onClick={handleCancel}
													sx={{
														border: "solid 2px",
														borderColor: red[700],
														borderRadius: "2em",
														color: red[700],
														"&:hover": {
															color: red[500],
															borderWidth: "2px",
															borderColor: red[500],
															backgroundColor: red[50],
														},
													}}
													disableRipple
												>
													<Typography variant="subtitle2">Cancel</Typography>
												</Button>
											</Box>
										)}
									</>
								)}
								{view === "posts" && (
									<>
										<Typography variant="h4">Posts</Typography>
									</>
								)}
								{view === "saved" && (
									<>
										<Typography variant="h4">Saved Posts</Typography>
									</>
								)}
							</Box>
						</Box>
					</Box>
				</div>
			)}
		</>
	);
}

export default Profile;
