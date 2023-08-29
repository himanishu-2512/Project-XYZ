import React, { useState, useMemo, useCallback, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Feed from "./Feed";
import Feed2 from "./Feed2";
import { Paper } from "@mui/material";
import { toast } from "react-toastify";

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

export default function BasicTabs(props) {

	const BASE_URL = process.env.REACT_APP_BASE_URL;

	const [value, setValue] = React.useState(0);

	//Skeleton Loading boolians
	const [isLoading1, setIsLoading1] = useState(false);
	const [isLoading2, setIsLoading2] = useState(false);


	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	//data1=Post data sent to Feed
	const [data1, setData1] = useState([]);

	const getAllPosts = useCallback(async () => {
		let url = `${BASE_URL}/post/allposts`;
		const response = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		const testData = await response.json();
		// setData1(testData);
		setData1({ testData, setCreate: props.setCreate, create: props.create });
		setIsLoading1(true);
		//console.log(testData.post);
	}, [BASE_URL, props.setCreate, props.create]);

	//data2=Question data sent to Feed
	const [data2, setData2] = useState([]);

	const getQuestions = useCallback(async () => {
		try{
		let url = `${BASE_URL}/question/allquestions`;
		const response = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		const testData = await response.json();
		setData2({ testData, setCreate: props.setCreate, create: props.create });
		setIsLoading2(true);
	}  catch (error) {
		toast.error(error, { pauseOnHover: "false" })
	}
		//console.log(testData.question);
	}, [BASE_URL, props.setCreate, props.create]);
	useEffect(() => {
		getQuestions();
		getAllPosts();
		//eslint-disable-next-line
	}, [props.create])

	useMemo(() => {
		getAllPosts();
		getQuestions();
	}, [getAllPosts, getQuestions]);

	return (
		<Box sx={{ marginTop: "2%", width: "100%", display: "flex", justifyContent: "center"}}>
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
				<Paper elevation={0} sx={{ bgcolor:"transparent"}}>
					<Box
						sx={{
							borderBottom: 1,
							borderColor: "divider",
							width: "100%",
							justifyContent: "space-evenly",
							display: "flex",
							bgcolor: "#1E293B",
							borderRadius: '5px'
						}}
					>
						<Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
							<Tab label="Opportunities" {...a11yProps(0)} sx={{ color: "white", ".MuiButtonBase-root.MuiTab-root.Mui-selected ": {color: "red"}}}/>
							<Tab label="Questions" {...a11yProps(1)} sx={{ color: "white" }} />
						</Tabs>
					</Box>
				</Paper>
				<TabPanel value={value} index={0}>
					<Feed data={data1} loading={isLoading1} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Feed2 data={data2} loading={isLoading2} />
				</TabPanel>
			</Box>
		</Box>
	);
}
