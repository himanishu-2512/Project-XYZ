import { Box, createTheme,  ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import Recents from "../component/Home/Recents";
import LeftBar from "../component/Home/RightBar/RightBar";
import FeedSwitch from "../component/Home/Feeds/FeedSwtich";
import Header from "../component/Home/Header";
import Share from "../component/Home/share";

const Homepage = ({ setLoginUser }) => {
	// const handlechange = () => {
	// 	setLoginUser({});
	// 	window.localStorage.removeItem("isLoggedIn");
	// };
	//Theme
	const [mode, setMode] = useState("dark");

	const darkTheme = createTheme({
		palette: {
			mode: mode,
		},
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<div className="homepage">
				<Box bgcolor={"background.default"} color={"text.primary"}>
					<Header setLoginUser={setLoginUser} setMode={setMode} mode={mode} />
					<div style={{ display: "flex" }}>
						<div style={{ flex: 3 }}>
							<Recents />
						</div>
						<div style={{ flex: 6 }}>
							<Share />
							<FeedSwitch />
						</div>
						<div style={{ flex: 3 }}>
							<LeftBar />
						</div>
					</div>
				</Box>
				{/* <button onClick={handlechange} >Logout</button> */}
			</div>
		</ThemeProvider>
	);
};

export default Homepage;
