import { Box } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ApplicationState } from "../../store";
import { saveURLAfterReload } from "../../store/actions/app/saveURLAfterReload";
import ToolBar from "../ToolBar/ToolBar";
import { useStyle } from "./MainPageStyle";

const connector = connect(
	(state: ApplicationState) => ({
		token: state.app.token,
		username: state.app.username,
		isLoggedIn: state.app.isLoggedIn,
	}),
	{
		saveURLAfterReload,
	}
);



function MainPage({
	token,
	username,
	isLoggedIn,
	saveURLAfterReload,
}: ConnectedProps<typeof connector>): ReactElement {
	const styles = useStyle();
	const navigate = useNavigate();
	const current = useParams();
	const [user, setUser] = useState({
		displayName: "",
		fullName: "",
	});

	useEffect(() => {
		const authToken = `Bearer ${token}`;

		fetch(`http://127.0.0.1:8000/api/profile/get/${username}`, {
			method: "GET",
			mode: "cors",
			headers: {
				"Accept": "application/json",
				"Authorization": authToken,
			},
		}).then(res => {
			console.log(res.status);
			return res.json();
		}).then(data => {
			setUser({
				displayName: `${data[0].profile.last_name}`,
				fullName: `${data[0].profile.first_name} ${data[0].profile.surname} ${data[0].profile.last_name}`,
			});
		});
	}, []);

	console.log(isLoggedIn);

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login");
		}
	}, [isLoggedIn]);

	return (
		<Box className={styles.root}>
			<ToolBar name={user.displayName} />
			<Outlet />
		</Box>
	);
}

export default connector(MainPage);