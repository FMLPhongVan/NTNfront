import { ReactElement, useEffect, useState } from "react";
import {
	Card,
	CardHeader,
	Typography,
	CardContent,
	Stack,
	ImageList,
	ImageListItem,
	Avatar,
	CardActions
} from "@mui/material";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ApplicationState } from "../../store";

const connector = connect((state: ApplicationState) => ({
	token: state.app.token,
}), {});

function ProfileInfo(props: any): ReactElement {

	console.log(props);
	const { username, token } = props;
	const friends = [
		{ name: "Tùng" },
		{
			name: "Nhật"
		},
		{
			name: "Ninh"
		},
		{
			name: "Hiếu"
		},
	];

	const [userInfo, setUserInfo] = useState({
		gender: "",
		dob: "",
		email: "",
		mobile: "",
	});

	useEffect(() => {
		const authToken = `Bearer ${token}`;
		fetch(`http://127.0.0.1:8000/api/profile/get/${username}`, {
			method: "GET",
			mode: "cors",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": authToken,
			},
		})
			.then(res => {
				console.log(res);
				return res.json();
			})
			.then(data => {
				console.log("From InfoUser");
				console.log(data);
				const dataGender = data[0].profile.gender == 0 ? "Nam" : data[0].profile.gender == 1 ? "Nữ" :
					data[0].profile.gender == 2 ? "Khác" : "Chưa cập nhật";
				const dataDob = data[0].profile.birthday != "" ? data[0].profile.birthday : "Chưa cập nhật";
				const dataMobile = data[0].profile.mobile != "" ? data[0].profile.mobile : "Chưa cập nhật";
				const dataEmail = data[0].email != "" ? data[0].email : "Chưa cập nhật";
				setUserInfo({
					gender: dataGender,
					dob: dataDob,
					email: dataEmail,
					mobile: dataMobile,
				});
			});
	}, [username]);

	return (
		<Stack mt="1rem" mr="0.5rem" spacing={2}>
			<Card sx={{ width: "400px" }}>
				<CardHeader
					sx={{ pb: "0" }}
					title={(<Typography component="span" variant="h5" fontWeight="bold">
						Thông tin
					</Typography>)} />
				<CardContent>
					<Typography variant="subtitle1" component="div">
						<div> <strong>Sinh Nhật:</strong> {userInfo.dob} </div>
						<div><strong>Giới tính:</strong> {userInfo.gender}</div>
						<div><strong>Email:</strong> {userInfo.email}</div>
						<div><strong>Số điện thoại:</strong> {userInfo.mobile}</div>
					</Typography>
				</CardContent>
			</Card>
			<Card sx={{ width: "400px", px: "0.5rem", justifyContent: "center" }}>
				<CardHeader
					sx={{ pb: "0" }}
					title={(<Typography component="span" variant="h5" fontWeight="bold">
						Bạn bè
					</Typography>)}
					subheader={<Typography color="#00000099">{51} người bạn</Typography>} />
				<ImageList sx={{ justifyItems: "center", gap: "0.5rem !important" }} cols={3}>
					{friends.map((friend) => (
						<ImageListItem key={friend.name} sx={{ width: "120px", height: "120px", alignItems: "center" }}>
							<Avatar sx={{ width: "120px", height: "120px" }} />
							<Typography variant="body2">{friend.name}</Typography>
						</ImageListItem>
					))}
				</ImageList>
				<CardActions sx={{ justifyContent: "end" }}>
					<Link style={{ color: "#27ae60", textDecoration: "none", }} to={`/${username}/friends`}>
						Xem thêm
					</Link>
				</CardActions>
			</Card>
		</Stack >
	);
} export default connector(ProfileInfo);