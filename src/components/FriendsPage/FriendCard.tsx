import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	Stack,
	Typography
} from "@mui/material";

interface IFriendCardProps {
	username: string,
	width: number
	description: string,
	requested: boolean,
}

export default function FriendCard(props: any) {
	const { username, width = "200px", requested = false,
		description = "Chào bạn, mình là " + username } = props;
	return (
		<Card sx={{ width: { width }, flexShrink: 0 }}>
			{requested ? (
				<Stack>
					< CardHeader
						avatar={<Avatar />} title={username}
						titleTypographyProps={{ fontWeight: "bold" }} />
					<Divider variant="middle" />
					<CardContent>
						<Typography>
							{description}
						</Typography>
					</CardContent>
					<CardActions sx={{ flexDirection: "column" }}>
						<Button fullWidth>
							<Typography textTransform="none" fontWeight="bold">
								Xác nhận
							</Typography>
						</Button>
						<Button fullWidth sx={{ m: "0 !important" }} color="secondary">
							<Typography textTransform="none" fontWeight="bold">
								Từ chối
							</Typography>
						</Button>
					</CardActions>
				</Stack>)
				: (<Stack alignItems="center" >
					<CardContent>
						<Avatar sx={{ width: "12rem", height: "12rem" }} variant="square" />
					</CardContent>
					<Typography alignSelf="start" pl="1rem" fontWeight="bold">
						{username}
					</Typography>
					<CardActions sx={{ flexDirection: "column" }}>
						<Button fullWidth>
							<Typography textTransform="none" fontWeight="bold">
								Thêm bạn bè
							</Typography>
						</Button>
						<Button fullWidth sx={{ m: "0 !important" }} color="secondary">
							<Typography textTransform="none" fontWeight="bold">
								Xóa, gỡ bỏ
							</Typography>
						</Button>
					</CardActions>
				</Stack>)
			}
		</Card >
	);
}