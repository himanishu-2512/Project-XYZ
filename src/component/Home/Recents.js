import React, { useState } from "react";
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
						class="Recents"
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
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 1 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Prakhar
												</Typography>
												{" — 1 day ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 1 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Prakhar
												</Typography>
												{" — 1 day ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 1 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Prakhar
												</Typography>
												{" — 1 day ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 1 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Prakhar
												</Typography>
												{" — 1 day ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 1 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Prakhar
												</Typography>
												{" — 1 day ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Travis Howard" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 2 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Vikrant
												</Typography>
												{" — 2 days ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Cindy Baker" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 3 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Kunal
												</Typography>
												{" — 3 days ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Cindy Baker" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 3 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Kunal
												</Typography>
												{" — 3 days ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
							</List>
						</Collapse>
					</Box>
				</Container>

				<Container>
					<Box
						class="Recents"
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
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 1 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Prakhar
												</Typography>
												{" — 1 day ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 1 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Prakhar
												</Typography>
												{" — 1 day ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 1 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Prakhar
												</Typography>
												{" — 1 day ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 1 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Prakhar
												</Typography>
												{" — 1 day ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 1 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Prakhar
												</Typography>
												{" — 1 day ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Travis Howard" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 2 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Vikrant
												</Typography>
												{" — 2 days ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Cindy Baker" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 3 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Kunal
												</Typography>
												{" — 3 days ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Cindy Baker" src="" />
									</ListItemAvatar>
									<ListItemText
										primary="Opportunity 3 description!!"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Kunal
												</Typography>
												{" — 3 days ago"}
											</React.Fragment>
										}
									/>
								</ListItem>
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
