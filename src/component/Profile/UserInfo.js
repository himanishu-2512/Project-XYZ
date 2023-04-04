import { CakeRounded, Clear, KeyboardArrowDown, KeyboardArrowUp, Mail, Place } from "@mui/icons-material";
import { Autocomplete, Avatar, Button, Chip, Collapse, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { useState } from "react";
import styled from "@emotion/styled";

const StyledAutocomplete = styled(Autocomplete)((props) => ({
	width: "30%",
	marginBottom: "10px",
	"& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
		transform: "translate(20px, 9px) scale(1);",
	},
	"&.Mui-focused .MuiInputLabel-outlined": {
		color: "grey",
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

function UserInfo({ checked }) {
	const [userSkills, setUserSkills] = useState([]);
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
	const [userInfoOpen, setUserInfoOpen] = useState(false);

	const handleSkillRemove = (e) => {
		const updatedSkills = userSkills.filter((skill) => skill !== e.target.closest("button").value);
		setUserSkills(updatedSkills);
	};

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
						{true && (
							<Grid item xs={12}>
								<StyledAutocomplete
									disablePortal
									value={value}
									onChange={(event, newValue) => {
										if (newValue && userSkills.indexOf(newValue) === -1)
											setUserSkills([newValue, ...userSkills].sort());
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
									{true && (
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

			<Box sx={{ color: "rgb(80,80,80)", marginBottom: "30px" }}>
				<Box sx={{ display: "flex" }}>
					<CakeRounded sx={{ width: "20px", height: "20px" }} />
					<Typography
						sx={{
							marginLeft: "15px",
							display: "flex",
							justifyContent: "center",
							alignItems: "end",
						}}
					>
						18/07/2001
					</Typography>
				</Box>
			</Box>
			<Box sx={{ color: "rgb(80,80,80)", marginBottom: "30px" }}>
				<Box sx={{ display: "flex" }}>
					<Place sx={{ width: "20px", height: "20px" }} />
					<Typography sx={{ marginLeft: "15px" }}>Kanpur, Uttar Pradesh</Typography>
				</Box>
			</Box>
			<Box sx={{ color: "rgb(80,80,80)", marginBottom: "30px" }}>
				<Box sx={{ display: "flex" }}>
					<Mail sx={{ width: "20px", height: "20px" }} />
					<Typography sx={{ marginLeft: "15px" }}>abcd@gmail.com</Typography>
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
				margin="10px 0 0 10%"
				onClick={() => setUserInfoOpen(!userInfoOpen)}
				sx={{ cursor: "pointer" }}
			>
				{!userInfoOpen && (
					<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
						{/* <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}> More Info</Typography> */}
						<KeyboardArrowDown />
					</Box>
				)}
				{userInfoOpen && <KeyboardArrowUp onClick={() => setUserInfoOpen(!userInfoOpen)} />}
			</Box>
			<Collapse in={userInfoOpen} timeout={500}>
				{info}
			</Collapse>
		</div>
	);
}

export default UserInfo;
