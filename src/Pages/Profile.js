import React, { useCallback, useEffect, useState } from "react";
import {
	Autocomplete,
	Avatar,
	Box,
	Chip,
	CircularProgress,
	FormControl,
	Grid,
	InputLabel,
	Modal,
	OutlinedInput,
	Paper,
	TextField,
	Typography,
	styled,
} from "@mui/material";
import NavBar from "../component/Home/Header";
import Button from "@mui/material/Button";
import { Add, CakeRounded, Cancel, Circle, Edit, Mail, Place } from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";

const StyledAutocomplete = styled(Autocomplete)({
	marginBlock: 8,
	marginInline: 6,
	label: {
		color: "#8aa6aa",
	},
	"& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
		transform: "translate(20px, 9px) scale(1);",
	},
	"& input": {
		padding: "0px",
		width: "200px",
	},
	"& .MuiInputBase-root": {
		padding: " 0 20px",
		border: "none",
		borderRadius: "10px",
		height: "40px",
		color: "#cad8e8",
	},
	"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
		borderColor: "grey",
	},
	".MuiSvgIcon-root": {
		color: "#8aa6aa",
	},
	backgroundColor: "#1e293bbb",
	borderRadius: "10px",
});

const StyledModal = styled(Modal)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	background: "#4b5561BB",
	backdropFilter: "blur(5px)",
	border: "none",
});

function Profile({ setLoginUser }) {
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const [user, setUser] = useState(null);
	const [updatedUser, setUpdatedUser] = useState(null);
	const [followCount, setFollowCount] = useState(null);
	const [alreadyfollow, setAlreadyFollow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [followersModalOpen, setFollowersModalOpen] = useState(false);
	const [followingModalOpen, setFollowingModalOpen] = useState(false);
	const [skillModalOpen, setSkillModalOpen] = useState(false);
	const navigate = useNavigate();
	let id = window.localStorage.getItem("userId");
	let currentUsername = window.localStorage.getItem("username");
	let authUsername = useParams();
	authUsername = authUsername.username;

	const skills = [
		"Android",
		"Angular",
		"C",
		"C++",
		"C#",
		"CSS",
		"Django",
		"Git",
		"Java",
		"JavaScript",
		"jQuery",
		"JSON",
		"Kotlin",
		"Linux",
		"MATLAB",
		"MongoDB",
		"MySQL",
		"Node.js",
		"OOP",
		"PHP",
		"R",
		"React.js",
		"Ruby",
		"Rust",
		"Scala",
		"Swift",
		"Unity",
		"Visio",
		"XML",
	];

	const [inputValue, setInputValue] = useState("");
	// const [cityInput, setCityInput] = useState("");
	// const [cities, setCities] = useState([]);
	// const [city, setCity] = useState(null);
	// const [date, setDate] = useState(user?.dob ? dayjs(user.dob) : null);

	// const [loading1, setLoading1] = useState(false);
	// const [loading2, setLoading2] = useState(false);
	// const [loading3, setLoading3] = useState(false);
	// const [loading4, setLoading4] = useState(false);

	// const [data2, setData2] = useState([]);
	// const getUserQuestions = useCallback(
	// 	async (username) => {
	// 		// console.log("get user questions")
	// 		//console.log(username)
	// 		let url = `${BASE_URL}/question/questions/user/${username}`;
	// 		const response = await fetch(url, {
	// 			method: "GET",
	// 			headers: {
	// 				Accept: "application/json",
	// 				"Content-Type": "application/json",
	// 			},
	// 		});
	// 		const testData = await response.json();
	// 		setData2(testData);
	// 		setLoading2(true);
	// 		//console.log(testData.question);
	// 	},
	// 	// eslint-disable-next-line
	// 	[BASE_URL, create]
	// );

	// const [data1, setData1] = useState([]);
	// const getUserPosts = useCallback(
	// 	async (username) => {
	// 		// console.log("get user posts")
	// 		//console.log(username)
	// 		let url = `${BASE_URL}/post/myposts/${username}`;
	// 		const response = await fetch(url, {
	// 			method: "GET",
	// 			headers: {
	// 				Accept: "application/json",
	// 				"Content-Type": "application/json",
	// 			},
	// 		});
	// 		const testData = await response.json();
	// 		setData1(testData);
	// 		setLoading1(true);

	// 		//console.log(testData.question);
	// 	},
	// 	// eslint-disable-next-line
	// 	[BASE_URL, create]
	// );

	// const [data3, setData3] = useState([]);
	// const getUserSavedQuestions = useCallback(
	// 	async (id) => {
	// 		//console.log(id)
	// 		// console.log("get saved questions")
	// 		let url = `${BASE_URL}/question/getsavequestions/${id}`;
	// 		const response = await fetch(url, {
	// 			method: "GET",
	// 			headers: {
	// 				Accept: "application/json",
	// 				"Content-Type": "application/json",
	// 			},
	// 		});
	// 		const testData = await response.json();
	// 		setData3(testData);
	// 		setLoading3(true);

	// 		//console.log(testData.question);
	// 	},
	// 	// eslint-disable-next-line
	// 	[BASE_URL, create]
	// );

	// const [data4, setData4] = useState([]);
	// const getUserSavedPosts = useCallback(
	// 	async (id) => {
	// 		//console.log(id)
	// 		// console.log("get saved posts")
	// 		let url = `${BASE_URL}/post/getsaveposts/${id}`;
	// 		const response = await fetch(url, {
	// 			method: "GET",
	// 			headers: {
	// 				Accept: "application/json",
	// 				"Content-Type": "application/json",
	// 			},
	// 		});
	// 		const testData = await response.json();
	// 		setData4(testData);
	// 		setLoading4(true);
	// 		//console.log(testData.question);
	// 	},
	// 	// eslint-disable-next-line
	// 	[BASE_URL, create]
	// );

	const fetchUser = useCallback(async () => {
		setIsLoading(true);
		try {
			const userInfo = await axios.get(`${BASE_URL}/auth/user/${authUsername}`);
			setUser(userInfo.data.user);
			setUpdatedUser(userInfo.data.user);
			setFollowCount(userInfo.data.user.follower.length);

			// getUserQuestions(userInfo.data.user.username);
			// getUserPosts(userInfo.data.user.username);

			// if (currentUsername === authUsername) {
			// 	getUserSavedQuestions(userInfo.data.user._id);
			// 	getUserSavedPosts(userInfo.data.user._id);
			// }
			if (userInfo.data.user.follower.some((follower) => follower.username === currentUsername)) {
				setAlreadyFollow(true);
			}
		} catch (error) {
			toast.error(error, { pauseOnHover: "false" });
		}
		setIsLoading(false);
	}, [
		BASE_URL,
		// getUserPosts,
		// getUserQuestions,
		// getUserSavedPosts,
		// getUserSavedQuestions,
		authUsername,
		currentUsername,
	]);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	const handleChange = (e) => {
		e.preventDefault();
		const { value, name } = e.target;
		setUpdatedUser(() => {
			return {
				...updatedUser,
				[name]: value,
			};
		});
	};

	const handleSave = async (e) => {
		e.preventDefault();
		setIsUpdating(true);
		const newUser = await axios.post(`${BASE_URL}/auth/updateuser/${id}`, updatedUser);
		console.log("Update Response:", newUser);
		setEditModalOpen(false);
		toast.success("Profile Updated Successfully ", { pauseOnHover: "false" });
		setUser(newUser.data.userUp);
		setUpdatedUser(newUser.data.userUp);
		setIsUpdating(false);
	};

	const handleFollow = async (e) => {
		e.preventDefault();
		if (alreadyfollow === true) {
			setFollowCount(followCount - 1);
		} else {
			setFollowCount(followCount + 1);
		}
		setAlreadyFollow(!alreadyfollow);

		await axios.post(`${BASE_URL}/follow/${user._id}/${id}`);
	};

	const handleCancel = () => {
		setUpdatedUser(user);
		setEditModalOpen(false);
	};

	const handleSkills = (newValue) => {
		setUpdatedUser({ ...updatedUser, skills: [newValue, ...updatedUser.skills].sort() });
		// setUserSkills([newValue, ...userSkills].sort());
	};
	const handleSkillRemove = (delSkill) => {
		setUpdatedUser({ ...updatedUser, skills: updatedUser.skills.filter((skill) => skill !== delSkill) });
		// setUserSkills(userSkills.filter((skill) => skill !== delSkill));
	};
	const handleDate = (newValue) => {
		setUpdatedUser({ ...updatedUser, dob: newValue.$d });
		// setDate(dayjs(newValue.$d));
	};
	// const handleCity = (newValue) => {
	// 	setUser({
	// 		...user,
	// 		city: newValue,
	// 	});
	// 	setCity(newValue);
	// };

	const handleContact = () => {
		window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${user.email}`, "_blank")?.focus();
	};

	const handleClickUsername = (username) => {
		setFollowersModalOpen(false);
		setFollowingModalOpen(false);
		navigate(`/profile/${username}`);
	};

	if (isLoading)
		return (
			<Box sx={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
				<Typography variant="h1" sx={{ color: "white" }}>
					LOADING...
				</Typography>
			</Box>
		);

	return (
		<>
			<ToastContainer
				hideProgressBar
				pauseOnHover={false}
				theme="colored"
				toastStyle={{ backgroundColor: "rgba(22, 56, 103, 0.8)" }}
				position="bottom-right"
			/>
			{user && (
				<Box
					sx={{
						background: "linear-gradient(180deg, #05081D 0%, rgba(37, 57, 48,0) 100%)",
						height: "100vh",
						width: "100vw",
						overflowY: "scroll",
						color: "#cad8e8",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<NavBar setLoginUser={setLoginUser} />
					<Box
						sx={{
							display: "flex",
							paddingTop: "2em",
							width: window.screen.width < 1700 ? "100%" : "auto",
							marginX: window.screen.width < 1700 ? "" : "auto",
							height: window.screen.height < 900 ? "90%" : "auto",
							marginBottom: window.screen.height < 900 ? "" : "auto",
							justifyContent: "space-around",
						}}
					>
						<Box
							sx={{
								width: "45%",
								paddingX: 8,
								display: "flex",
								flexDirection: "column",
								gap: 6,
							}}
						>
							<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
								<Box sx={{ position: "relative", width: "400px", height: "365px" }}>
									<Box
										sx={{
											width: "250px",
											height: "250px",
											backgroundColor: "rgba(31, 90, 142, 0.8)",
											border: "1px solid #EAFDFC",
											borderRadius: "70px",
										}}
									></Box>
									<Box
										sx={{
											width: "280px",
											height: "280px",
											backgroundColor: "rgba(22, 56, 103, 0.8)",
											border: "1px solid #91D8E4",
											borderRadius: "70px",
											position: "absolute",
											top: "20px",
											left: "25px",
										}}
									></Box>
									<Box
										sx={{
											height: "320px",
											width: "320px",
											backgroundImage: `url("https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80")`,
											backgroundSize: "cover",
											borderRadius: "70px",
											position: "absolute",
											top: "45px",
											left: "60px",
											border: "1px solid #fff",
										}}
									></Box>
								</Box>
							</Box>
							{(user.city || user.dob || user.bio) && (
								<Box
									sx={{
										backgroundColor: "rgba(4, 23, 46, 1)",
										borderRadius: "30px",
										display: "flex",
										flexDirection: "column",
										gap: 4,
										padding: 4,
										flexGrow: 1,
									}}
								>
									<Typography variant="h6">About</Typography>

									{user.bio && <Typography>{user.bio}</Typography>}

									<Box sx={{ display: "flex" }}>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											{user.dob && (
												<Box
													sx={{
														display: "flex",
														height: "100%",
													}}
												>
													<CakeRounded sx={{ width: "20px", height: "20px", color: "rgba(12, 140, 233, 1)" }} />
													<DatePicker
														value={dayjs(user.dob)}
														readOnly
														sx={{
															marginLeft: "15px",
															fieldset: { border: "none" },
															input: {
																padding: 0,
																color: "#cad8e8",
															},
															".MuiInputAdornment-root": {
																display: "none",
															},
														}}
													/>
												</Box>
											)}
										</LocalizationProvider>
										{user.city && (
											<Box sx={{ display: "flex", color: "white" }}>
												<Place sx={{ width: "20px", height: "20px", color: "rgba(12, 140, 233, 1)" }} />
												<Typography sx={{ marginLeft: "15px" }}>{user.city}</Typography>
											</Box>
										)}
									</Box>
								</Box>
							)}
						</Box>

						<Box sx={{ width: "45%", paddingX: 8, display: "flex", flexDirection: "column", gap: 6 }}>
							<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<Box>
									<Typography variant="h5">{user.username}</Typography>
									<Typography sx={{ color: "#8295ad" }}>{user.name}</Typography>
								</Box>
								{currentUsername !== user.username && (
									<Button
										disableRipple
										disableTouchRipple
										sx={{
											backgroundColor: "rgba(12, 140, 233, 1)",
											color: "black",
											height: "40px",
											paddingX: 1.5,
											borderRadius: "10px",
											textTransform: "none",
											fontWeight: "bold",
											fontSize: "16px",
											transition: "all 0.2s",
											"&:hover": {
												backgroundColor: "rgba(12,110,180,1)",
											},
										}}
										onClick={(e) => handleFollow(e)}
									>
										{!alreadyfollow && <Add fontSize="small" sx={{ marginRight: 1 }} />}
										<Typography>{alreadyfollow ? "Following" : "Follow"}</Typography>
									</Button>
								)}
								{currentUsername === user.username && (
									<Button
										sx={{
											border: "2px solid #cad8e8",
											borderRadius: "30px",
											backgroundColor: "rgba(44, 56, 74, 1)",
											textTransform: "none",
											display: "flex",
											alignItems: "center",
											gap: 1,
											color: "#cad8e8",
											paddingX: 2,
											paddingY: 0,
											height: "40px",
										}}
										onClick={() => setEditModalOpen(true)}
									>
										<Edit sx={{ color: "rgba(12, 140, 233, 1)", fontSize: "20px", paddinY: 0 }} />
										Edit Profile
									</Button>
								)}
							</Box>
							<StyledModal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
								<Box
									sx={{
										background: "linear-gradient(180deg, #05081D 0%, rgba(37, 57, 48,0) 100%)",
										backgroundColor: "rgba(4, 23, 46, 1)",
										height: "720px",
										width: "620px",
										borderRadius: "30px",
										padding: 4,
										display: "flex",
										flexDirection: "column",
										gap: 4,
										position: "relative",
									}}
								>
									<Typography sx={{ color: "white", paddingLeft: 1 }} variant="h4">
										Edit Profile
									</Typography>
									<Box
										sx={{
											flexGrow: 1,
											display: "flex",
											flexDirection: "column",
											gap: 4,
											".MuiInputBase-root": { borderRadius: "10px" },
											"label.MuiInputLabel-shrink ": {
												color: "#c6c6c6",
											},
											fieldset: {
												border: "2px solid  #455e87",
											},
											".MuiInputBase-root:hover fieldset": {
												border: "2px solid  #455e87",
											},
											".MuiInputBase-root.Mui-focused fieldset": {
												border: "2px solid #b5b5b5",
											},
											".MuiInputBase-root.Mui-focused label.MuiInputLabel-shrink": {
												color: "#b5b5b5",
											},
											overflow: "auto",
											"&::-webkit-scrollbar": {
												display: "none",
											},
											padding: 1,
										}}
									>
										<FormControl sx={{ backgroundColor: "#1e293bbb", borderRadius: "10px" }}>
											<InputLabel
												htmlFor="component-outlined"
												sx={{
													color: "#8aa6aa",
												}}
											>
												Name
											</InputLabel>
											<OutlinedInput
												id="component-outlined"
												label="Name"
												name="name"
												sx={{ color: "#cad8e8" }}
												value={updatedUser.name}
												onChange={handleChange}
											/>
										</FormControl>
										<FormControl sx={{ backgroundColor: "#1e293bbb", borderRadius: "10px" }}>
											<InputLabel
												htmlFor="component-outlined"
												sx={{
													color: "#8aa6aa",
												}}
											>
												Bio
											</InputLabel>
											<OutlinedInput
												id="component-outlined"
												label="Bio"
												name="bio"
												multiline
												rows={4}
												sx={{ color: "#cad8e8" }}
												value={updatedUser.bio}
												onChange={handleChange}
												inputProps={{ maxLength: 150 }}
											/>
											<Typography
												sx={{
													color: "#8aa6aa",
													fontSize: "12px",
													margin: "0.5em 0 0 1em",
													fontWeight: "bold",
													position: "absolute",
													right: 7,
													bottom: 3,
												}}
											>
												{updatedUser.bio.length}/150
											</Typography>
										</FormControl>
										<FormControl sx={{ backgroundColor: "#1e293bbb", borderRadius: "10px" }}>
											<InputLabel
												htmlFor="component-outlined"
												sx={{
													color: "#8aa6aa",
												}}
											>
												City
											</InputLabel>
											<OutlinedInput
												id="component-outlined"
												label="City"
												name="city"
												multiline
												sx={{ color: "#cad8e8" }}
												value={updatedUser.city}
												onChange={handleChange}
												inputProps={{ maxLength: 20 }}
											/>
											<Typography
												sx={{
													color: "#8aa6aa",
													fontSize: "12px",
													margin: "0.5em 0 0 1em",
													fontWeight: "bold",
													position: "absolute",
													right: 7,
													bottom: 3,
												}}
											>
												{updatedUser.city.length}/20
											</Typography>
										</FormControl>
										<FormControl>
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<Box
													sx={{
														display: "flex",
														height: "100%",
														alignItems: "center",
													}}
												>
													<CakeRounded sx={{ width: "20px", height: "20px", color: "rgba(12, 140, 233, 1)" }} />
													<DatePicker
														value={dayjs(updatedUser.dob)}
														onChange={(newValue) => handleDate(newValue)}
														sx={{
															marginLeft: "15px",
															input: {
																padding: 2,
																color: "#cad8e8",
															},
															label: {
																fontWeight: "bold",
																color: "transparent",
															},
															".MuiInputAdornment-root": {
																svg: {
																	color: "#cad8e8",
																},
															},
															backgroundColor: "#1e293bbb",
														}}
														slotProps={{
															leftArrowIcon: { sx: { color: "#cad8e8" } },
															rightArrowIcon: { sx: { color: "#cad8e8" } },
															calendarHeader: { sx: { color: "#cad8e8" } },
															day: { sx: { color: "#cad8e8" } },
															switchViewIcon: { sx: { color: "#cad8e8" } },
															popper: {
																sx: {
																	borderRadius: "10px",
																	color: "#cad8e8",
																	".MuiPaper-root.MuiPickersPopper-paper": {
																		background: "transparent",
																		borderRadius: "20px",
																	},
																	".MuiPickersLayout-root": {
																		background: "rgba(44, 56, 74, 1)",
																		borderRadius: "20px",
																	},
																	".MuiDayCalendar-weekDayLabel": {
																		color: "#cad8e8",
																	},
																	".MuiPickersYear-root": {
																		color: "#cad8e8",
																	},
																	".MuiYearCalendar-root::-webkit-scrollbar-track": {
																		backgroundColor: "transparent",
																	},
																	".MuiYearCalendar-root::-webkit-scrollbar-thumb": {
																		border: "none",
																	},
																},
															},
														}}
													/>
												</Box>
											</LocalizationProvider>
										</FormControl>
										<FormControl>
											<Box sx={{ border: "2px solid #455e87", borderRadius: "10px", padding: 1 }}>
												<StyledAutocomplete
													disablePortal
													value={null}
													onChange={(event, newValue) => {
														if (newValue && updatedUser.skills.indexOf(newValue) === -1) handleSkills(newValue);
														setInputValue("");
													}}
													inputValue={inputValue}
													selectOnFocus={true}
													onInputChange={(event, newInputValue) => {
														setInputValue(newInputValue);
													}}
													id="clear-on-escape"
													options={skills.filter((skill) => updatedUser.skills?.indexOf(skill) === -1)}
													renderInput={(params) => <TextField {...params} label="Choose Skill" />}
													PaperComponent={({ children }) => (
														<Paper
															sx={{
																background: "rgba(44, 56, 74, 1)",
																borderRadius: "10px",
															}}
														>
															{children}
														</Paper>
													)}
													renderOption={(params, option) => (
														<Typography {...params} sx={{ color: "#cad8e8" }}>
															{option}
														</Typography>
													)}
												/>
												{updatedUser.skills.map((skill) => {
													return (
														<Chip
															label={skill}
															sx={{
																color: "#cad8e8",
																backgroundColor: "rgba(44, 56, 74, 1)",
																".MuiChip-deleteIcon:hover": {
																	color: "#8aa6aa",
																},
																margin: 1,
															}}
															onDelete={() => handleSkillRemove(skill)}
															deleteIcon={<Cancel />}
															key={skill}
														></Chip>
													);
												})}
											</Box>
										</FormControl>
									</Box>
									<Box sx={{ display: "flex", justifyContent: "flex-end", gap: 4 }}>
										<Button
											sx={{
												border: "2px solid #455e87",
												borderRadius: "20px",
												paddingX: 2,
												color: "#8aa6aa",
												"&:hover": { color: "#cad8e8" },
											}}
											onClick={handleSave}
										>
											Save
											{isUpdating && <CircularProgress sx={{ color: "#cad8e8", marginLeft: 2 }} size={20} />}
										</Button>
										<Button
											sx={{
												border: "2px solid #455e87",
												borderRadius: "20px",
												paddingX: 2,
												color: "#8aa6aa",
												"&:hover": { color: "#cad8e8" },
											}}
											onClick={handleCancel}
										>
											Cancel
										</Button>
									</Box>
								</Box>
							</StyledModal>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Box
									sx={{
										background: "rgba(44, 56, 74, 1)",
										borderRadius: "10px",
										color: "#cad8e8",
										width: "20%",
										textAlign: "center",
										paddingX: 1,
										paddingY: 1,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Typography>{user.posts?.length + user.questions?.length} Posts</Typography>
								</Box>
								<Box
									sx={{
										background: "rgba(44, 56, 74, 1)",
										borderRadius: "10px",
										color: "#cad8e8",
										width: "20%",
										textAlign: "center",
										paddingX: 1,
										paddingY: 1,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										cursor: "pointer",
										transition: "all 0.20s",
										"&:hover": {
											background: "rgba(44, 56, 74, 0.75)",
										},
									}}
									onClick={() => setFollowersModalOpen(true)}
								>
									<Typography>{followCount} Followers</Typography>
								</Box>
								<StyledModal
									open={followersModalOpen}
									onClose={(e) => {
										setFollowersModalOpen(false);
									}}
								>
									<Box
										sx={{
											background: "linear-gradient(180deg, #05081D 0%, rgba(37, 57, 48,0) 100%)",
											backgroundColor: "rgba(4, 23, 46, 1)",
											height: "680px",
											width: "440px",
											borderRadius: "30px",
											padding: 4,
											display: "flex",
											flexDirection: "column",
											gap: 4,
											position: "relative",
										}}
									>
										<Typography sx={{ color: "white" }} variant="h5">
											Followers
										</Typography>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												flexGrow: 1,
												gap: 2,
												overflowY: "auto",
												"&::-webkit-scrollbar-track": {
													background: "transparent",
												},
											}}
										>
											{user.follower?.map((follower) => {
												return (
													<>
														<Box
															sx={{
																backgroundColor: "#1e293b",
																borderRadius: "15px",
																paddingX: 2,
																paddingY: 1,
																width: "99%",
																display: "flex",
																gap: 2,
																alignItems: "center",
															}}
															key={follower._id}
														>
															<Avatar sx={{ textTransform: "uppercase" }}>{follower.name[0]}</Avatar>
															<Box>
																<Typography
																	sx={{ color: "#cad8e8", cursor: "pointer" }}
																	variant="subtitle1"
																	onClick={() => handleClickUsername(follower.username)}
																>
																	{follower.username}
																</Typography>
																<Typography sx={{ color: "#8295ad" }} variant="subtitle2">
																	{follower.name}
																</Typography>
															</Box>
														</Box>
													</>
												);
											})}
										</Box>
										{user.follower?.length === 0 && (
											<Typography
												sx={{
													textAlign: "center",
													color: "#bec8d5",
													position: "absolute",
													top: "50%",
													width: "calc(100% - 64px)",
												}}
											>
												No followers yet.
											</Typography>
										)}
									</Box>
								</StyledModal>
								<Box
									sx={{
										background: "rgba(44, 56, 74, 1)",
										borderRadius: "10px",
										color: "#cad8e8",
										width: "20%",
										textAlign: "center",
										paddingX: 1,
										paddingY: 1,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										cursor: "pointer",
										transition: "all 0.20s",
										"&:hover": {
											background: "rgba(44, 56, 74, 0.75)",
										},
									}}
									onClick={() => setFollowingModalOpen(true)}
								>
									<Typography>{user.following?.length} Following</Typography>
								</Box>
								<StyledModal
									open={followingModalOpen}
									onClose={(e) => {
										setFollowingModalOpen(false);
									}}
								>
									<Box
										sx={{
											background: "linear-gradient(180deg, #05081D 0%, rgba(37, 57, 48,0) 100%)",
											backgroundColor: "rgba(4, 23, 46, 1)",
											height: "680px",
											width: "440px",
											borderRadius: "30px",
											padding: 4,
											display: "flex",
											flexDirection: "column",
											gap: 4,
											position: "relative",
										}}
									>
										<Typography sx={{ color: "white" }} variant="h5">
											Following
										</Typography>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												flexGrow: 1,
												gap: 2,
												overflowY: "auto",
												"&::-webkit-scrollbar-track": {
													background: "transparent",
												},
											}}
										>
											{user.following?.map((following) => {
												return (
													<>
														<Box
															sx={{
																backgroundColor: "#1e293b",
																borderRadius: "15px",
																paddingX: 2,
																paddingY: 1,
																width: "99%",
																display: "flex",
																gap: 2,
																alignItems: "center",
															}}
															key={following._id}
														>
															<Avatar sx={{ textTransform: "uppercase" }}>{following.name[0]}</Avatar>
															<Box>
																<Typography
																	sx={{ color: "#cad8e8", cursor: "pointer" }}
																	variant="subtitle1"
																	onClick={() => handleClickUsername(following.username)}
																>
																	{following.username}
																</Typography>
																<Typography sx={{ color: "#8295ad" }} variant="subtitle2">
																	{following.name}
																</Typography>
															</Box>
														</Box>
													</>
												);
											})}
										</Box>
										{user.following?.length === 0 && (
											<Typography
												sx={{
													textAlign: "center",
													color: "#bec8d5",
													position: "absolute",
													top: "50%",
													width: "calc(100% - 64px)",
												}}
											>
												Not following anyone yet.
											</Typography>
										)}
									</Box>
								</StyledModal>
							</Box>
							<Box
								sx={{
									backgroundColor: "rgba(4, 23, 46, 1)",
									flexGrow: 1,
									borderRadius: "30px",
									padding: 4,
									display: "flex",
									flexDirection: "column",
									gap: 6,
								}}
							>
								{user.skills?.length > 0 && (
									<Box>
										<Typography sx={{ marginBottom: "0.75em" }} variant="h6">
											Skills
										</Typography>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												justifyContent: "space-between",
											}}
										>
											<Grid container rowSpacing={2} columnSpacing={2}>
												{user.skills.map((skill, index) => {
													if (index > 7) return <></>;
													return (
														<Grid key={`user${skill}`} item xs={4} sx={{ display: "flex" }}>
															<Box
																sx={{
																	display: "flex",
																	gap: 1.5,
																	alignItems: "center",
																}}
															>
																<Circle sx={{ fontSize: "10px", color: "rgba(12, 140, 233, 1)" }} />
																<Typography>{skill}</Typography>
															</Box>
														</Grid>
													);
												})}
												{user.skills.length > 8 && (
													<Grid item xs={4} sx={{ display: "flex" }} onClick={() => setSkillModalOpen(true)}>
														<Box
															sx={{
																display: "flex",
																gap: 1.5,
																alignItems: "center",
																p: {
																	color: "#aeb8c5",
																},
																"&:hover": {
																	p: {
																		color: "white",
																	},
																},
																cursor: "pointer",
															}}
														>
															<Typography sx={{ transition: "all 0.15s" }}>+ {user.skills.length - 8} more</Typography>
														</Box>
													</Grid>
												)}
											</Grid>
										</Box>
									</Box>
								)}
								<StyledModal open={skillModalOpen} onClose={() => setSkillModalOpen(false)}>
									<Box
										sx={{
											background: "linear-gradient(180deg, #05081D 0%, rgba(37, 57, 48,0) 100%)",
											backgroundColor: "rgba(4, 23, 46, 1)",
											maxHeight: "680px",
											width: "440px",
											borderRadius: "30px",
											paddingX: 8,
											paddingY: 6,
											display: "flex",
											flexDirection: "column",
											gap: 4,
										}}
									>
										<Typography sx={{ color: "white" }} variant="h4">
											Skills
										</Typography>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												flexGrow: 1,
												gap: 4,
												overflowY: "scroll",
												"&::-webkit-scrollbar-track": {
													background: "transparent",
												},
											}}
										>
											<Grid container rowSpacing={2} columnSpacing={2} sx={{}}>
												{user.skills.map((skill) => {
													return (
														<Grid item xs={6} sx={{ display: "flex", gap: 1.5, alignItems: "center" }} key={skill}>
															<Circle sx={{ fontSize: "10px", color: "rgba(12, 140, 233, 1)" }} />
															<Typography sx={{ color: "#cad8e8" }}>{skill}</Typography>;
														</Grid>
													);
												})}
											</Grid>
										</Box>
									</Box>
								</StyledModal>
								<Box>
									<Typography sx={{ marginBottom: "0.75em" }} variant="h6">
										Education
									</Typography>
									<Box sx={{ display: "flex", marginTop: "10px" }}>
										<Circle sx={{ fontSize: "10px", marginTop: 1, color: "rgba(12, 140, 233, 1)" }} />
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												marginLeft: "16px",
												justifyContent: "center",
											}}
										>
											<Typography sx={{ fontSize: "18px" }}>
												Indian Institute of Information Technology, Ranchi
											</Typography>
											<Typography variant="subtitle2">Bachelor of Technology</Typography>
										</Box>
									</Box>
								</Box>
								<Box>
									<Typography sx={{ marginBottom: "0.75em" }} variant="h6">
										Contact
									</Typography>

									<Box sx={{ color: "#cad8e8" }}>
										<Box sx={{ display: "flex" }}>
											<Mail sx={{ width: "20px", height: "20px", color: "rgba(12, 140, 233, 1)" }} />
											<Typography sx={{ marginLeft: "15px", cursor: "pointer" }} onClick={handleContact}>
												{user.email}
											</Typography>
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			)}
		</>
	);
}

export default Profile;
