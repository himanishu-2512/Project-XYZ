import { Bookmarks, GridOn } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

function UserPosts() {
	return (
		<div>
			<Box sx={{ margin: "10px 0 0 0", display: "flex", justifyContent: "space-evenly" }}>
				<Button sx={{ display: "flex", alignItems: "center", textTransform: "none", color: "black" }}>
					<GridOn sx={{ width: "20px", height: "20px" }} />
					<Typography sx={{ marginLeft: "10px" }}> Posts</Typography>
				</Button>
				<Button sx={{ display: "flex", alignItems: "center", textTransform: "none", color: "black" }}>
					<Bookmarks sx={{ width: "20px", height: "20px" }} />
					<Typography sx={{ marginLeft: "10px" }}>Saved</Typography>
				</Button>
			</Box>
		</div>
	);
}

export default UserPosts;
