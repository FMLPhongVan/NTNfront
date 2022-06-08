import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import FriendCard from "./FriendCard";

export default function FriendRequestList() {

	const scrl = React.useRef<HTMLDivElement>(null);
	const [scrollX, setscrollX] = React.useState(0);

	const slide = (shift: any) => {
		if (scrl && scrl.current) {
			scrl.current.scrollLeft += shift;
			setscrollX(scrollX + shift);
		}
	};

	return (

		<Box width="100%">
			<Typography variant="subtitle1" fontSize="20px" fontWeight="bold" ml="1rem" mt="1rem">
				Lời mời kết bạn
			</Typography>
			<Stack ref={scrl} sx={{
				p: "1rem", scrollBehavior: "smooth",
				overflowX: "scroll", "&::-webkit-scrollbar": { display: "none" }
			}} spacing={2} direction="row">
				<FriendCard username="Ninh Nguyễn" requested={true} />
				<FriendCard username="Hoàng Minh Nhật" requested={true} />
				<FriendCard username="Vũ Hiếu" requested={true} />
				<FriendCard username="Nguyễn Hải Bình" requested={true} />
				<FriendCard username="Đoàn Duy Tùng" requested={true} />
				<FriendCard username="Ninh Nguyễn" requested={true} />
				<FriendCard username="Hoàng Minh Nhật" requested={true} />
				<FriendCard username="Vũ Hiếu" requested={true} />
				<FriendCard username="Nguyễn Hải Bình" requested={true} />
				<FriendCard username="Đoàn Duy Tùng" requested={true} />
				<IconButton sx={{
					position: "absolute", top: "18rem", marginLeft: "-0.5rem !important",
					backgroundColor: "#65676B60 !important"
				}} onClick={() => slide(-216)}>
					<ArrowLeft color="primary" />
				</IconButton>
				<IconButton sx={{
					position: "absolute", top: "18rem", right: "0.5rem",
					backgroundColor: "#65676B60 !important"
				}} onClick={() => slide(+216)}>
					<ArrowRight color="primary" />
				</IconButton>
			</Stack>
		</Box >
	);
}