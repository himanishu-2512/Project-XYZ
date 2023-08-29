import { CakeRounded, Clear, Mail, Place } from "@mui/icons-material";
import { Autocomplete, Avatar, Button, Chip, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const StyledAutocomplete = styled(Autocomplete)((props) => ({
	width: "30%",
	marginBottom: "10px",
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
		borderRadius: "30px",
		height: "40px",
	},
	"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
		borderColor: "grey",
	},
}));

function UserInfo({ checked, user, setUser }) {
	const [userSkills, setUserSkills] = useState(user.skills);
	const [loadingText, setLoadingText] = useState("Loading...");
	const [inputValue, setInputValue] = useState("");
	const [cityInput, setCityInput] = useState("");
	const [cities, setCities] = useState([]);
	const [city, setCity] = useState(null);
	const [date, setDate] = useState(user.dob ? dayjs(user.dob) : null);

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
		setUserSkills([newValue, ...userSkills].sort());
	};

	const handleSkillRemove = (e) => {
		setUser({ ...user, skills: userSkills.filter((skill) => skill !== e.target.closest("button").value) });
		setUserSkills(userSkills.filter((skill) => skill !== e.target.closest("button").value));
	};

	const handleDate = (newValue) => {
		setUser({ ...user, dob: newValue.$d });
		setDate(dayjs(newValue.$d));
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
					const updatedCities = [...new Set(gotCities)];
					setLoadingText(gotCities.length > 0 ? "Loading..." : "No city found");
					setCities(updatedCities);
				} catch (error) {
					toast.error(error, { pauseOnHover: "false" })
				}
			}, 750);
			return () => clearTimeout(fetchCities);
		} else setCities([]);
	}, [cityInput]);

	return (
		<div>
			<Box>
				{(user.skills.length > 0 || checked) && (
					<Box
						sx={{ margin: "30px 0", border: "solid 1px rgba(200,200,200,0.7)", borderRadius: "1em", padding: "1.5em" }}
					>
						<Typography sx={{ marginBottom: "1.5em" }} variant="h6">
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
								{checked && (
									<Grid item xs={12}>
										<StyledAutocomplete
											disablePortal
											value={value}
											onChange={(event, newValue) => {
												if (newValue && userSkills.indexOf(newValue) === -1) handleSkills(newValue);
												setInputValue("");
											}}
											inputValue={inputValue}
											selectOnFocus={true}
											onInputChange={(event, newInputValue) => {
												setInputValue(newInputValue);
											}}
											id="clear-on-escape"
											options={options}
											renderInput={(params) => <TextField {...params} label="Choose Skill" />}
										/>
									</Grid>
								)}
								{userSkills.map((skill) => {
									return (
										<Grid key={`user${skill}`} item xs={2} sx={{ display: "flex" }}>
											<Chip
												label={skill}
												variant="outlined"
												sx={{
													width: "100%",
													fontSize: "15px",
												}}
											/>
											{checked && (
												<Button
													sx={{
														color: "rgb(80,80,80)",
														"&:hover": {
															backgroundColor: "transparent",
															color: "grey",
														},
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
				)}
				<Box
					sx={{ margin: "30px 0", border: "solid 1px rgba(200,200,200,0.7)", borderRadius: "1em", padding: "1.5em" }}
				>
					<Typography sx={{ marginBottom: "1.5em" }} variant="h6">
						Education
					</Typography>
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
							<Typography variant="subtitle2">Bachelor of Technology</Typography>
						</Box>
					</Box>
				</Box>
				<Box
					sx={{
						border: "solid 1px rgba(200,200,200,0.7)",
						borderRadius: "1em",
						padding: "1.5em",
						marginBottom: "30px",
					}}
				>
					<Typography sx={{ marginBottom: "1.5em" }} variant="h6">
						Personal Information
					</Typography>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						{(user.dob || checked) && (
							<Box sx={{ color: "rgb(80,80,80)", marginBottom: "30px" }}>
								<Box
									sx={{
										display: "flex",
										height: "100%",
									}}
								>
									<CakeRounded sx={{ width: "20px", height: "20px" }} />
									<DatePicker
										value={date}
										onChange={(newValue) => handleDate(newValue)}
										readOnly={!checked}
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
											".MuiInputAdornment-root": {
												display: checked ? "" : "none",
											},
										}}
									/>
								</Box>
							</Box>
						)}
					</LocalizationProvider>
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
											setCityInput(newInputValue);
										}}
										renderInput={(params) => <TextField {...params} label="Choose City" />}
										sx={{
											width: "50%",
											marginBottom: "10px",
											marginLeft: "15px",
											fieldset: !checked ? { border: "none" } : {},
											fontWeight: "bold",
											input: {
												paddingX: !checked ? "0" : "",
											},
											label: {
												fontWeight: "bold",
											},
											".MuiAutocomplete-endAdornment": {
												display: checked ? "" : "none",
											},
										}}
									/>
								)}
								{!checked && <Typography sx={{ marginLeft: "15px" }}>{user.city}</Typography>}
							</Box>
						</Box>
					)}
					<Box sx={{ color: "rgb(80,80,80)" }}>
						<Box sx={{ display: "flex" }}>
							<Mail sx={{ width: "20px", height: "20px" }} />
							<Typography sx={{ marginLeft: "15px" }}>{user.email}</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</div>
	);
}

export default UserInfo;
