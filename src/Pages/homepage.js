import { Box, createTheme, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import Recents from "../component/Home/Recents";
import LeftBar from "../component/Home/RightBar/RightBar";
import FeedSwitch from "../component/Home/Feeds/FeedSwtich";
import Header from "../component/Home/Header";
import Share from "../component/Home/share";

const Homepage = ({ setLoginUser }) => {
	const [create,setCreate]=useState(false)
	//Theme
	const [mode, setMode] = useState("light");

	const darkTheme = createTheme({
		palette: {
			mode: mode,
		},
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 900,
				lg: 1200,
				big: 1400,
				xl: 1536,
			},
		},
	});

	return (
    <ThemeProvider theme={darkTheme}>
      <div className="homepage">
        <Box
          bgcolor={"background.default"}
          color={"text.primary"}
          height={"100%"}
        >
          <Header setLoginUser={setLoginUser} setMode={setMode} mode={mode} />
          <div style={{ display: "flex" }}>
            <Box
              sx={{
                flex: { md: "2", lg: "3" },
                display: { xs: "none", md: "block" },
              }}
            >
              <Recents />
            </Box>
            <Box
              sx={{
                flex: {
                  md: "4",
                  lg: "6",
                },
              }}
            >
              <Share setCreate={setCreate} create={create} />
              <FeedSwitch setCreate={setCreate} create={create} />
              
            </Box>
            <Box
              sx={{
                flex: 3,
                display: { xs: "none", big: "block" },
              }}
            >
              <LeftBar />
            </Box>
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Homepage;
