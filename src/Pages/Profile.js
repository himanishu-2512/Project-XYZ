import React, { useCallback, useEffect, useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import NavBar from "../component/Home/Header";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import UserInfo from "../component/Profile/UserInfo";
import FeedSwitch from "../component/Profile/FeedSwtich";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { blue, green, red } from "@mui/material/colors";
import { useParams } from "react-router";
import { toast ,ToastContainer} from "react-toastify";;



function Profile({ setLoginUser }) {
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const [edit, setEdit] = useState(false);
	const [user, setUser] = useState();
	const [view, setView] = useState("profile");
	const [followCount, setFollowCount ] = useState(null)
	const [authUserId, setAuthUserId] = useState(null);
	const [alreadyfollow, setAlreadyFollow] = useState(false);
	const [create, setCreate] = useState(false)
	let id = window.localStorage.getItem("userId");
	let currentUsername = window.localStorage.getItem("username");
	let authUsername = useParams()
	authUsername = authUsername.username 

	const [data2, setData2] = useState([]);
	const getUserQuestions = useCallback(
		async (username) => {
			// console.log("get user questions")
			//console.log(username)
			let url = `${BASE_URL}/question/questions/user/${username}`;
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const testData = await response.json();
			setData2(testData);
			//console.log(testData.question);
		},
		// eslint-disable-next-line
		[BASE_URL,create]
	);

	const [data1, setData1] = useState([]);
	const getUserPosts = useCallback(
		async (username) => {
			// console.log("get user posts")
			//console.log(username)
			let url = `${BASE_URL}/post/myposts/${username}`;
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const testData = await response.json();
			setData1(testData);
			//console.log(testData.question);
		},
		// eslint-disable-next-line
		[BASE_URL, create]
	);

	const [data3, setData3] = useState([]);
	const getUserSavedQuestions = useCallback(
		async (id) => {
			//console.log(id)
			// console.log("get saved questions")
			let url = `${BASE_URL}/question/getsavequestions/${id}`;
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const testData = await response.json();
			setData3(testData);
			//console.log(testData.question);
		},
		// eslint-disable-next-line
		[BASE_URL, create]
	);

	const [data4, setData4] = useState([]);
	const getUserSavedPosts = useCallback(
		async (id) => {
			//console.log(id)
			// console.log("get saved posts")
			let url = `${BASE_URL}/post/getsaveposts/${id}`;
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const testData = await response.json();
			setData4(testData);
			//console.log(testData.question);
		},
		// eslint-disable-next-line
		[BASE_URL, create]
	);

	const fetchUser = useCallback(async () => {
		try {
			const userInfo = await axios.get(`${BASE_URL}/auth/user/${authUsername}`);
			setUser(userInfo.data.user);
			getUserQuestions(userInfo.data.user.username);
			getUserPosts(userInfo.data.user.username);
			setAuthUserId(userInfo.data.user._id)
			if(currentUsername === authUsername){
				getUserSavedQuestions(userInfo.data.user._id);
				getUserSavedPosts(userInfo.data.user._id);
			}
			setFollowCount(userInfo.data.user.follower.length)
			if(userInfo.data.user.follower.some(follower => follower.username === currentUsername))
			{
				setAlreadyFollow(true)
			}
		} catch (error) {
			toast.error(error, { pauseOnHover: "false" })
		}
	}, [BASE_URL, getUserPosts, getUserQuestions, getUserSavedPosts, getUserSavedQuestions, authUsername, currentUsername]);

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
		toast.success("Profile Updated Successfully ",  { pauseOnHover: "false" });
		setUser(updatedUser.data.userUp);
		
	};

	const handleFollow = async (e) =>{
		e.preventDefault();
		if(alreadyfollow === true)
		{
			setFollowCount(followCount-1)
		} else {
			setFollowCount(followCount+1)
		}
		setAlreadyFollow(!alreadyfollow)

		await axios.post(`${BASE_URL}/follow/${authUserId}/${id}`);

	}
	// console.log(followCount)
	const handleCancel = () => {
		fetchUser();
		
		setEdit(false);
	};
	return (
		<>

		<ToastContainer/>
			{user && (
				<div>
					<Box>
						<NavBar setLoginUser={setLoginUser} />
						<Box sx={{ display: "flex" }}>
							<Stack sx={{ width: "20%", height: "50vh", position: "sticky", top: "8%", paddingTop: "2rem" }}>
								<Button
									sx={{
										justifyContent: "flex-start",
										backgroundColor: view === "profile" ? "#d4f4fa" : "",
										borderRadius: "0 2em 2em 0",
										"&:hover": {
											backgroundColor: view === "profile" ? "#d4f4fa" : "",
										},
									}}
									disableRipple
									onClick={() => setView("profile")}
								>
									<Typography
										sx={{
											marginLeft: "2rem",
											padding: "0.5rem 1rem",
											fontSize: "1.25em",
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
										backgroundColor: view === "posts" ? "#d4f4fa" : "",
										borderRadius: "0 2em 2em 0",
										"&:hover": {
											backgroundColor: view === "posts" ? "#d4f4fa" : "",
										},
									}}
									onClick={() => setView("posts")}
								>
									<Typography
										sx={{
											marginLeft: "2rem",
											padding: "0.5rem 1rem",
											fontSize: "1.25em",
											textTransform: "none",
											color: view === "posts" ? "blue[300]" : "rgb(100, 100, 100)",
										}}
									>
										Posts
									</Typography>
								</Button>
								{currentUsername === authUsername && <Button
									disableRipple
									sx={{
										justifyContent: "flex-start",
										backgroundColor: view === "saved" ? "#d4f4fa" : "",
										borderRadius: "0 2em 2em 0",
										"&:hover": {
											backgroundColor: view === "saved" ? "#d4f4fa" : "",
										},
									}}
									onClick={() => setView("saved")}
								>
									<Typography
										sx={{
											marginLeft: "2rem",
											padding: "0.5rem 1rem",
											fontSize: "1.25em",
											textTransform: "none",
											color: view === "saved" ? "blue[300]" : "rgb(100, 100, 100)",
										}}
									>
										Saved
									</Typography>
								</Button>}
							</Stack>

							<Box sx={{ width: "80%", padding: "2em 3em 0 6em" }}>
								{view === "profile" && (
									<>
										<Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "2em" }}>
											<Typography sx={{ fontSize: "1.75em" }}>Profile</Typography>
											{currentUsername === authUsername && <Button
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
													fontSize: "14px",
													textTransform: "none",
												}}
											>
												<Edit sx={{ marginRight: "5px", fontSize: "16px" }} />
												Edit Profile
											</Button>}
										</Box>
										<Box
											sx={{
												border: "solid 1px rgba(200,200,200,0.7)",
												borderRadius: "1em",
												padding: "1.5em",
												display: "flex",
												alignItems: "center",
											}}
										>
											<Avatar
												alt={user.name}
												src="/link-here"
												sx={{ height: 100, width: 100, fontSize: "3rem", marginLeft: "0.5em" }}
											>{authUsername[0].toUpperCase()}</Avatar>
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
															fontSize: "1.25rem",
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
													inputProps={{ maxLength: 150 }}
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
												{edit && (
													<Typography
														sx={{ color: "gray", fontSize: "12px", margin: "0.5em 0 0 1em", fontWeight: "bold" }}
													>
														{user.bio.length}/150
													</Typography>
												)}
											</Box>
											<Box sx={{ flexGrow: 3, display: "flex", flexDirection: "column" }}>
											{currentUsername !== authUsername && <Button
												onClick={(e) => handleFollow(e)}
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
													fontSize: "14px",
													textTransform: "none",
												}}
											>
												
												{( alreadyfollow) ? "Following"  : "Follow"}
											</Button>}
												<Typography>
													<span style={{ fontWeight: "bold" }}>{user.posts.length + user.questions.length}</span> Posts
												</Typography>
												<Typography>
													<span style={{ fontWeight: "bold" }}>{followCount}</span> Followers
												</Typography>
												<Typography>
													<span style={{ fontWeight: "bold" }}>{user.following.length}</span> Following
												</Typography>

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
										<Typography sx={{ fontSize: "1.75em" }}>Posts</Typography>
										<FeedSwitch post={data1} username={user.username} question={data2} setCreate={setCreate} create={create} />
									</>
								)}
								{view === "saved" && (
									<>
										<Typography sx={{ fontSize: "1.75em" }}>Saved Posts</Typography>
										<FeedSwitch savedpost={data4} username={user.username} savedquestion={data3} setCreate={setCreate} create={create} />
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
