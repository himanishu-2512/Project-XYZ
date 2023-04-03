import { CakeRounded,KeyboardArrowDown, KeyboardArrowUp, Mail, Place } from "@mui/icons-material";
import {
	Avatar,
	
	Chip,
	Collapse,
	
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { useState } from "react";
// import React, { useState } from "react";

function UserInfo({ checked }) {
	// const [userSkills, setUserSkills] = useState([]);
	const skills = ["Android", "Angular", "C", "C++", "C#"];
	const [userInfoOpen, setUserInfoOpen] = useState(false);

	// const handleChange = (e) => {
	// 	setUserSkills([...userSkills, e.target.value]);
	// };

	// const handleSkillRemove = (e) => {
	// 	console.log(e.target.closest("button"));
	// };

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
					{/* <FormControl sx={{ width: "50%", margin: "10px 0 10px 0" }}>
							<InputLabel id="demo-simple-select-label">Choose Skill</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value=""
								label="Choose Skill"
								onChange={handleChange}
							>
								{skills.map((skill) => {
									return (
										<MenuItem key={skill} value={skill}>
											{skill}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl> */}
					<Grid container rowSpacing={2} columnSpacing={2} sx={{ margin: "0" }}>
						{skills.map((skill) => {
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
									{/* <Button sx={{ color: "grey" }} onClick={handleSkillRemove}>
											<Clear />
										</Button> */}
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

			{/* <Box
					sx={{
						display: "flex",
						justifyContent: "space-around",
						margin: "60px 0 50px 0",
						color: "rgb(80,80,80)",
					}}
				>
					<Box sx={{ flex: "1" }}>
						<Box sx={{ display: "flex" }}>
							<CakeRounded />
							<Typography sx={{ marginLeft: "15px" }}>24/04/2000</Typography>
						</Box>
					</Box>
					<Box sx={{ flex: "1" }}>
						<Box sx={{ display: "flex" }}>
							<Place />
							<Typography sx={{ marginLeft: "15px" }}>Tonk, Rajasthan</Typography>
						</Box>
					</Box>
				</Box> */}
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
			<Collapse in={userInfoOpen}>{info}</Collapse>
		</div>
	);
}

export default UserInfo;
