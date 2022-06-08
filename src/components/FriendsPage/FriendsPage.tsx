import { Box, Divider } from "@mui/material";
import FriendRecommendedList from "./FriendRecommendedList";
import FriendRequestList from "./FriendRequestList";


export default function FriendsPage() {

	return (
		<Box>
			<FriendRequestList />
			<Divider sx={{ m: "2.5rem" }} variant="middle" />
			<Box>
				<FriendRecommendedList />
			</Box>
		</Box >
	);
}