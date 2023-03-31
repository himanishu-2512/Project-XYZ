import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { Box } from "@mui/system";

function RightBar() {
	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<Accordion
				disableGutters
				sx={{
					padding: "20px 30px 10px 30px",
					border: "none",
					boxShadow: "none",
					"&:before": {
						display: "none",
					},
				}}
			>
				<AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography sx={{ fontSize: "18px" }}>Recent Opportunities</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ paddingX: "0" }}>
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
					</List>
				</AccordionDetails>
			</Accordion>
			<Divider sx={{ width: "80%", alignSelf: "center", marginRight: "2%" }} />
			<Accordion
				disableGutters
				sx={{
					padding: "10px 30px 20px 30px",
					border: "none",
					boxShadow: "none",
					"&:before": {
						display: "none",
					},
				}}
			>
				<AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography sx={{ fontSize: "18px" }}>Recent Questions</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ paddingX: "0" }}>
					<List>
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								<Avatar alt="" src="" />
							</ListItemAvatar>
							<ListItemText
								primary="Question 1 description!!"
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
								primary="Question 2 description!!"
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
								primary="Question 3 description!!"
								secondary={
									<React.Fragment>
										<Typography
											sx={{ display: "inline" }}
											component="span"
											variant="body2"
											color="text.primary"
										>
											Himanshu
										</Typography>
										{" — 3 days ago"}
									</React.Fragment>
								}
							/>
						</ListItem>
					</List>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
}

export default RightBar;
