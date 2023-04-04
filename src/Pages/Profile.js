import React from "react";
import { Box, Typography } from "@mui/material";
import NavBar from "../component/Home/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import UserInfo from "../component/Profile/UserInfo";
// import { useState } from "react";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UserPosts from "../component/Profile/UserPosts";
import { PersonAdd } from "@mui/icons-material";

function Profile() {
	// const [userInfoOpen, setUserInfoOpen] = useState(false);

	return (
		<div>
			<Box>
				<NavBar />
				<Container component="main" maxWidth="md">
					<CssBaseline />
					<Box
						sx={{
							// marginLeft: "10%",
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-end",
							alignItems: "center",
						}}
					>
						<Box
							sx={{
								// flex: "1",
								display: "flex",
								justifyContent: "center",
								width: "30%",
							}}
						>
							<Avatar alt="" src="" sx={{ width: 100, height: 100, margin: 2 }} />
						</Box>
						<Box
							sx={{
								// marginLeft: "10%",
								display: "flex",
								flexDirection: "column",
								alignItems: "right",
								// flex: "1",
								width: "70%",
							}}
						>
							<Box
								sx={{
									marginTop: 1,
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
									<Typography variant="h5" sx={{ letterSpacing: "1px", fontWeight: "bold" }}>
										Kunal Chaurasia
									</Typography>
									<Typography
										variant="body2"
										sx={{
											color: "rgb(80,80,80)",
											marginTop: "10px",
										}}
									>
										Kunalc
									</Typography>
								</Box>
								<Box sx={{ marginLeft: "auto" }}>
									<Button variant="outlined">
										<PersonAdd />
										{/* <Typography variant="caption" sx={{ marginLeft: "10px" }}>
											Follow
										</Typography> */}
									</Button>
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
										17
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
										67
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
								<Box>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur officia et,
									quidem aut praesentium, ducimus quod officiis exercitationem voluptatum facilis
									fugiat pariatur fuga totam ipsa quam repellendus odio corporis est.
								</Box>
							</Box>
						</Box>
					</Box>
					<Box sx={{ marginX: "5%" }}>
						<UserInfo />
					</Box>
					<Divider />
					<UserPosts />
				</Container>
			</Box>
		</div>
	);
}

export default Profile;
