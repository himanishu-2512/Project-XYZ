import React, { useCallback, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Collapse } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { Box } from "@mui/system";
import styled from "styled-components";

function RightBar() {
	const [expandOpportunities, setExpandOpportunities] = useState(false);
	const handleExpandOpportunities = () => {
		setExpandOpportunities(!expandOpportunities);
	};

	const [expandQuestions, setExpandQuestions] = useState(false);
	const handleExpandQuestions = () => {
		setExpandQuestions(!expandQuestions);
	};
	const [data, setData] = useState({})
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const getRecents = useCallback(
		async () => {
			let url = `${BASE_URL}/recents/get-recents`;
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const testData = await response.json();
			setData(testData);
			//eslint-disable-next-line
		},[BASE_URL, expandOpportunities, expandQuestions]
	);
	useEffect(() => {
		getRecents();
	}, [getRecents]);

	const timeDemo=(time)=>{
		var msPerMinute = 60 * 1000;
		var msPerHour = msPerMinute * 60;
		var msPerDay = msPerHour * 24;
		var msPerMonth = msPerDay * 30;
		var msPerYear = msPerDay * 365;
	
		var elapsed = new Date() - new Date(time);
	
		if (elapsed < msPerMinute) {
			 return Math.round(elapsed/1000) + ' seconds ago';   
		}
	
		else if (elapsed < msPerHour) {
			 return Math.round(elapsed/msPerMinute) + ' minutes ago';   
		}
	
		else if (elapsed < msPerDay ) {
			 return Math.round(elapsed/msPerHour ) + ' hours ago';   
		}
	
		else if (elapsed < msPerMonth) {
			return '' + Math.round(elapsed/msPerDay) + ' days ago';   
		}
	
		else if (elapsed < msPerYear) {
			return '' + Math.round(elapsed/msPerMonth) + ' months ago';   
		}
	
		else {
			return '' + Math.round(elapsed/msPerYear ) + ' years ago';   
		}
		}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				width: { md: "33.33%", lg: "35%", big: "25%" },
				height: "100%",
			}}
		>
			<Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
				<Container>
					<Box
						className="Recents"
						sx={{
							marginBottom: "5%",
						}}
					>
						<Typography
							sx={{
								display: "flex",
								justifyContent: "space-between",
								paddingX: "8%",
								marginY: "5%",
								cursor: "pointer",
							}}
							onClick={handleExpandOpportunities}
						>
							Recent Opportunities
							<ExpandMore
								sx={{
									transition: "transform 0.5s",
									transform: `${expandOpportunities ? "rotate(180deg)" : ""}`,
								}}
							/>
						</Typography>

						<Collapse
							className={"collapse"}
							in={expandOpportunities}
							timeout={500}
							sx={{ padding: "0  8% 0 3%", position: "relative", maxHeight: "35vh", overflowY: "scroll" }}
						>
							<List>
								{data.recent?.recentPosts?.map((item, index)=>{
									return(<>
										<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="" src="" />
									</ListItemAvatar>
									<ListItemText
										primary={`${item.title}`}
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													{item.userId.username}
												</Typography>
												{" — " + timeDemo(item.createdAt)}
											</React.Fragment>
										}
									/>
									</ListItem>
									<Divider variant="inset" component="li" /> 
									</>)
								})}
							</List>
						</Collapse>
					</Box>
				</Container>

				<Container>
					<Box
						className="Recents"
						sx={{
							marginBottom: "5%",
						}}
					>
						<Typography
							sx={{
								display: "flex",
								justifyContent: "space-between",
								paddingX: "8%",
								marginY: "5%",
								cursor: "pointer",
							}}
							onClick={handleExpandQuestions}
						>
							Recent Questions
							<ExpandMore
								sx={{
									transition: "transform 0.5s",
									transform: `${expandQuestions ? "rotate(180deg)" : ""}`,
								}}
							/>
						</Typography>

						<Collapse
							className={"collapse"}
							in={expandQuestions}
							timeout={500}
							sx={{ padding: "0  8% 0 3%", position: "relative", maxHeight: "35vh", overflowY: "scroll" }}
						>
							<List>
							{data.recent?.recentQuestions?.map((item, index)=>{
									return(<>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Cindy Baker" src="" />
									</ListItemAvatar>
									<ListItemText
										primary={`${item.title}`}
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													{item.userId.username}
												</Typography>
												{" — " + timeDemo(item.createdAt)}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								</>)})}
							</List>
						</Collapse>
					</Box>
				</Container>
			</Box>
		</Box>
	);
}

export default RightBar;

const Container = styled.div`
	.MuiCollapse-root::-webkit-scrollbar {
		width: 6px;
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 10px;
	}
	.MuiCollapse-root::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.3);
		height: 20px;
		border-radius: 10px;
	}
`;
