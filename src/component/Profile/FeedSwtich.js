import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Feed from "./post";
import Feed2 from "./question";
import { Paper } from "@mui/material";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box
					sx={{
						padding: {
							xs: "24px 0",
							sm: "24px",
						},
						display: "flex",
						justifyContent: "center",
					}}
				>
					{children}
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function BasicTabs({post, username, question, savedpost, savedquestion}) {
	//console.log(question, post, savedpost, savedquestion)
	let postdata = post ? post.user.posts : savedpost.posts.savedPosts;
	let questiondata = question ? question.posts.questions : savedquestion.posts.savedQuestions;

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ marginTop: "2%", maxWidth: "100%", display: "flex", justifyContent: "center" }}>
			<Box
				sx={{
					width: {
						xs: "100%",
						sm: "100%",
						lg: "85%",
					},
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<Paper elevation={0}>
					<Box
						sx={{
							borderBottom: 1,
							borderColor: "divider",
							width: "100%",
							justifyContent: "space-evenly",
							display: "flex",
						}}
					>
						<Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
							<Tab label="Opportunities" {...a11yProps(0)} />
							<Tab label="Questions" {...a11yProps(1)} />
						</Tabs>
					</Box>
				</Paper>
				<TabPanel value={value} index={0}>
					<Feed data = {postdata} username={username}/>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Feed2 data = {questiondata} username ={username}/>
				</TabPanel>
			</Box>
		</Box>
	);
}
