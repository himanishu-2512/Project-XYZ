import { CakeRounded, Clear, ExpandMore, Mail, Place } from "@mui/icons-material";
import { Autocomplete, Avatar, Button, Chip, Collapse, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

const StyledAutocomplete = styled(Autocomplete)((props) => ({
	width: "30%",
	marginBottom: "10px",
	"& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
		transform: "translate(20px, 9px) scale(1);",
	},
	// "&.Mui-focused .MuiInputLabel-outlined": {
	// 	color: "red",
	// },
	labe: {
		color: "red",
	},
	"& input": {
		padding: "0px",
		width: "200px",
	},
	"& .MuiInputBase-root": {
		padding: " 0 20px",
		border: "none",
		borderRadius: "30px",
		height: "40px",
	},
	"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
		borderColor: "grey",
	},
}));

function UserInfo({ checked, user, setUser }) {
	const [userInfoOpen, setUserInfoOpen] = useState(false);
	const [userSkills, setUserSkills] = useState(user.skills);
	const [loadingText, setLoadingText] = useState("Loading");
	const [inputValue, setInputValue] = useState("");
	const [cityInput, setCityInput] = useState("");
	const [cities, setCities] = useState([]);
	const [city, setCity] = useState(null);
	const [date, setDate] = useState(user.dob ? user.dob.slice(0, 10) : "");

	const [demo, setDemo] = useState(null);
	const [demoInput, setDemoInput] = useState("");

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
	const options = skills.filter((skill) => userSkills.indexOf(skill) === -1);
	const value = null;

	const handleSkills = (newValue) => {
		setUser({ ...user, skills: [newValue, ...userSkills].sort() });
		// console.log("On adding:", user.skills);
		setUserSkills([newValue, ...userSkills].sort());
	};

	const handleSkillRemove = (e) => {
		setUser({ ...user, skilss: userSkills.filter((skill) => skill !== e.target.closest("button").value) });
		setUserSkills(userSkills.filter((skill) => skill !== e.target.closest("button").value));
	};

	const handleDate = (e) => {
		// user.dob = e.target.value;
		setUser({ ...user, dob: e.target.value });
		setDate(e.target.value);
	};

	const handleCity = (newValue) => {
		setUser({
			...user,
			city: newValue,
		});
		setCity(newValue);
	};

	useEffect(() => {
		if (cityInput.length > 0) {
			const fetchCities = setTimeout(async () => {
				try {
					const response = await axios.get(
						`http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${cityInput}`
					);
					const gotCities = response.data.data.map((city) => `${city.city}, ${city.region}, ${city.country}`);
					// console.log(gotCities);
					const updatedCities = [...new Set(gotCities)];
					setLoadingText(gotCities.length > 0 ? "Loading..." : "No city found");
					setCities(updatedCities);
				} catch (error) {
					console.log(error);
				}
			}, 750);
			return () => clearTimeout(fetchCities);
		} else setCities([]);
		// if (cityInput.length > 0) fetchCities();
		// else setCities([]);
	}, [cityInput]);

	// console.log(cityInput);

	const info = (
		<Box>
			<Box sx={{ margin: "30px 0" }}>
				<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>Skills</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<Grid container rowSpacing={2} columnSpacing={2} sx={{ margin: "0" }}>
						{checked && (
							<Grid item xs={12}>
								<StyledAutocomplete
									disablePortal
									value={value}
									onChange={(event, newValue) => {
										if (newValue && userSkills.indexOf(newValue) === -1) handleSkills(newValue);
									}}
									inputValue={inputValue}
									selectOnFocus={true}
									onInputChange={(event, newInputValue) => {
										setInputValue(newInputValue);
									}}
									id="combo-box-demo"
									options={options}
									renderInput={(params) => <TextField {...params} label="Choose Skill" />}
								/>
							</Grid>
						)}
						{userSkills.map((skill) => {
							return (
								<Grid key={`user${skill}`} item xs={4} sx={{ display: "flex" }}>
									<Chip
										label={skill}
										variant="outlined"
										sx={{
											width: "100%",
											fontSize: "15px",
											fontWeight: "bold",
										}}
									/>
									{checked && (
										<Button
											sx={{
												color: "grey",
											}}
											value={skill}
											onClick={handleSkillRemove}
										>
											<Clear />
										</Button>
									)}
								</Grid>
							);
						})}
					</Grid>
				</Box>
			</Box>
			<Box sx={{ margin: "30px 0" }}>
				<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>Education</Typography>
				<Box sx={{ display: "flex", marginTop: "10px" }}>
					<Avatar src="images/iiitr.png" alt="" sx={{ width: "80px", height: "80px" }} />
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							marginLeft: "40px",
							justifyContent: "center",
						}}
					>
						<Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
							Indian Institute of Information Technology, Ranchi
						</Typography>
						<Typography variant="subtitle2">Bachelor of Technology - BTech, Computer Science</Typography>
						<Typography variant="caption">2020 - 2024</Typography>
					</Box>
				</Box>
			</Box>

			{(user.dob || checked) && (
				<Box sx={{ color: "rgb(80,80,80)", marginBottom: "30px" }}>
					<Box
						sx={{
							display: "flex",
							height: "100%",
						}}
					>
						<CakeRounded sx={{ width: "20px", height: "20px" }} />
						<TextField
							type="date"
							value={date}
							InputProps={{
								readOnly: !checked,
							}}
							onChange={handleDate}
							sx={{
								color: "rgb(80,80,80)",
								marginLeft: "15px",
								fieldset: !checked ? { border: "none" } : {},
								input: {
									color: "rgb(80,80,80)",
									padding: !checked ? "2px 0 0 0 " : "",
								},
								label: {
									fontWeight: "bold",
									color: "transparent",
								},
							}}
						></TextField>
					</Box>
				</Box>
			)}
			{(user.city || checked) && (
				<Box sx={{ color: "rgb(80,80,80)", marginBottom: "30px" }}>
					<Box sx={{ display: "flex" }}>
						<Place sx={{ width: "20px", height: "20px" }} />
						{checked && (
							<Autocomplete
								disablePortal
								options={cities}
								loading={cityInput.length > 0 ? true : false}
								loadingText={loadingText}
								noOptionsText="Type to search"
								value={city}
								onChange={(event, newValue) => handleCity(newValue)}
								inputValue={cityInput}
								onInputChange={(event, newInputValue) => {
									// console.log(newInputValue);
									setCityInput(newInputValue);
								}}
								renderInput={(params) => <TextField {...params} label="Choose City" />}
								sx={{ width: "50%", marginBottom: "10px", marginLeft: "15px" }}
							/>
						)}
						{!checked && <Typography sx={{ marginLeft: "15px" }}>{user.city}</Typography>}
					</Box>
				</Box>
			)}
			<Box sx={{ color: "rgb(80,80,80)", marginBottom: "30px" }}>
				<Box sx={{ display: "flex" }}>
					<Mail sx={{ width: "20px", height: "20px" }} />
					<Typography sx={{ marginLeft: "15px" }}>{user.email}</Typography>
					<Autocomplete
						options={skills}
						value={demo}
						onChange={(event, newValue) => setDemo(newValue)}
						inputValue={demoInput}
						onInputChange={(event, newInputValue) => setDemoInput(newInputValue)}
						renderInput={(params) => <TextField {...params} label="Demo" />}
						sx={{ width: "50%" }}
					/>
				</Box>
			</Box>
		</Box>
	);

	return (
		<div>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				marginTop="10px"
				onClick={() => setUserInfoOpen(!userInfoOpen)}
				sx={{ cursor: "pointer" }}
			>
				<ExpandMore
					sx={{
						transition: "transform 0.5s",
						transform: `${userInfoOpen || checked ? "rotate(180deg)" : ""}`,
					}}
				/>
			</Box>
			<Collapse in={userInfoOpen || checked} timeout={500}>
				{info}
			</Collapse>
		</div>
	);
}

export default UserInfo;
