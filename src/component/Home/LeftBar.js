import React from "react";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Paper, Collapse, CardContent } from "@mui/material";
import RightBar from "./Notifications";
import CancelIcon from "@mui/icons-material/Cancel";
import styled from "styled-components";

function LeftBar() {
	const [checked, setChecked] = React.useState(false);

	const handleChange = () => {
		setChecked((prev) => !prev);
	};

	return (
		<StyledBoxOuter>
			<StyledBox>
				<Avatar
					style={{ marginLeft: "5px", color: "white", backgroundColor: "#2196f3", cursor: "pointer" }}
					component={Paper}
					elevation={5}
					onClick={handleChange}
					id={`avatar-${checked}`}
				>
					{!checked && <NotificationsIcon />}
					{checked && <CancelIcon />}
				</Avatar>

				<Collapse in={checked} timeout={500} unmountOnExit>
					<CardContent sx={{ paddingTop: "0" }}>
						<RightBar />
					</CardContent>
				</Collapse>
			</StyledBox>
		</StyledBoxOuter>
	);
}

const StyledBoxOuter = styled.div`
	position: fixed;
	display: flex;
	width: 25%;
	div:has(#avatar-true) {
		left: 0;
	}
`;

const StyledBox = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%;
	animation: notification 1s;
	position: relative;
	padding: 10px 0;
	left: calc(100% - 55px);
	transition: all 0.5s ease-in-out;

	@keyframes notification {
		0% {
			transform: translateX(90%);
		}
	}
`;

export default LeftBar;
