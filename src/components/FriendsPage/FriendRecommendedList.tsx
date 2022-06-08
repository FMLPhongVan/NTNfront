import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FriendCard from "./FriendCard";

const friends = [
	{ username: "Đoàn Duy Tùng" },
	{ username: "Hoàng Minh Nhật" },
	{ username: "Ninh Nguyễn" },
	{ username: "Vũ Hiếu" },
	{ username: "Nguyễn Minh Ngọc" },
	{ username: "Nguyễn Hải Bình" },
	{ username: "Đoàn Duy Tùng" },
	{ username: "Hoàng Minh Nhật" },
	{ username: "Ninh Nguyễn" },
	{ username: "Vũ Hiếu" },
	{ username: "Nguyễn Minh Ngọc" },
	{ username: "Nguyễn Hải Bình" },
];

export default function FriendRecommendedList() {
	return (
		<Box>
			<Typography variant="subtitle1" fontSize="20px" fontWeight="bold" ml="1rem" mt="1rem">
				Những người bạn có thể biết
			</Typography>
			<Grid display="flex" p="1rem" pr="0" container spacing={4} columns={20}>
				{friends.map((friend) => (
					<Grid item xs={4} key="friend">
						<FriendCard width="16rem" username={friend.username} requested={false} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
} 