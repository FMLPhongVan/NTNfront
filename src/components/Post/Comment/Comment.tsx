import { Avatar, Box, Grid, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import CommentActions from "./CommentActions/CommentActions";
import { useStyles } from "./CommentStyle";

interface CommentProp {
	postId: number,
	userId: number,
	content: string,
	createAt: string,
}

const connector = connect((state: ApplicationState) => ({token: state.app.token}), {});

function Comment(props: any): ReactElement {
	const { token, ...others } = props;
	const authToken = `Bearer ${token}`;
	const styles = useStyles();

	const [userData, setUserData] = useState({
		fullName: "",
		username: "",
	});

	useEffect(() => {
		fetch(`http://127.0.0.1:8000/api/profile/getid/${props.userId}`, {
			method: "GET",
			mode: "cors",
			headers: {
				"Authorization": authToken,
			}
		})
			.then(res => res.json())
			.then(data => {
				setUserData({
					fullName: `${data[0].profile.first_name} ${data[0].profile.surname} ${data[0].profile.last_name}`,
					username: data[0].username,
				});
			});
	}, []);

	return (
		<Box className={styles.root}>
			<Grid container>
				<Grid item xs={1.5}><Avatar sx={{ width: 44, height: 44, mx: "auto" }} /></Grid>
				<Grid item xs={9.5}>
					<Grid item>
						<Typography variant="body1">
							{userData.fullName + " "} 
							<Typography component="span" variant="caption">{`@${userData.username}`}</Typography>
							{" - "} 
							<Typography component="span" variant="subtitle2">{new Date(props.createAt).toLocaleString()}</Typography>
						</Typography>
					</Grid>
					<Grid item xs={12} my={2} pr={1}>
						{props.content.split("\n")
							.map((text: string, index: number) => 
								(<p style={{ marginTop: 0 }} key={index}>{text}</p>)
							)}
					</Grid>
				</Grid>
				<Grid item xs={1}>
					<CommentActions />
				</Grid>
			</Grid>
		</Box>
	);
}

export default connector(Comment);