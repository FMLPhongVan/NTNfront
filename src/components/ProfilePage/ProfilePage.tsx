import { ReactElement, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { connect, ConnectedProps } from "react-redux";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import { ApplicationState } from "../../store";
import ProfileMain from "./ProfileMain";
import { useParams } from "react-router-dom";

interface ProfileData {
	userId: number;
	username: string;
	firstName: string;
	middleName: string;
	lastName: string;
	gender: number;
	dob: string;
	email: string;
}

const connector = connect(
	(state: ApplicationState) => ({
		token: state.app.token,
	})
);

function ProfilePage({
	token,
}: ConnectedProps<typeof connector>): ReactElement {
	const { username } = useParams();
	const [userData, setUserData] = useState<ProfileData>({
		userId: 0,
		username: "",
		firstName: "",
		middleName: "",
		lastName: "",
		gender: 0,
		dob: "",
		email: "",
	});

	useEffect(() => {
		const authToken = `Bearer ${token}`;
		fetch(`http://127.0.0.1:8000/api/profile/get/${username}`, {
			method: "GET",
			mode: "cors",
			headers: {
				"Authorization": authToken,
			}
		}).then(res => res.json())
			.then(data => {
				console.log(data);
				setUserData({
					userId: data[0].id,
					username: data[0].username,
					email: data[0].email,
					firstName: data[0].profile.first_name,
					middleName: data[0].profile.surname,
					lastName: data[0].profile.last_name,
					gender: data[0].profile.gender,
					dob: data[0].profile.birthday
				});
			});
	}, [username]);

	return (
		<Box>
			<ProfileHeader userData={userData} />
			<Box display="flex" flexDirection="row" justifyContent="center">
				<ProfileInfo username={username} />
				<ProfileMain userId={userData.userId} />
			</Box>
		</Box >
	);
}

export default connector(ProfilePage);