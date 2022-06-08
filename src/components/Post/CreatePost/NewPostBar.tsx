import styled from "@emotion/styled";
import { FlagOutlined, PhotoLibraryOutlined, VideocamOutlined } from "@mui/icons-material";
import { 
	Avatar, 
	ButtonBase, 
	Card, 
	CardContent, 
	Divider, 
	TextareaAutosize 
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ReactElement, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ApplicationState } from "../../../store";
import { changeOpenState } from "../../../store/actions/createPost/changeOpenState";

const CustomCard = styled(Card)`
	height: 150px;
	width: 640px !important;
	margin: auto;
`;

const TextPostArea = styled(TextareaAutosize)`
	resize: none;
	width: 470px;
	margin: 15px;
	border: none;
	outline: none;
	font-family: inherit;
	font-size: 1.25rem;
	letter-spacing: 0.25px;
`;
const useStyles = makeStyles({
	createTextPost: {
		background: "#f5f5f5 !important",
		color: "#65676b !important",
		paddingLeft: "1.5rem !important",
		borderRadius: "25px !important",
		margin: "0 20px !important",
		fontSize: "1.0625rem",
		fontWeight: "medium",
		height: "40px",
		minWidth: "500px",
		justifyContent: "flex-start !important",
		transitionDuration: "0.35s",
		"&:hover": {
			backgroundColor: "#00000015 !important",
			transitionDuration: "0.35s",
		}
	},

	createOtherPost: {
		height: "48px",
		fontSize: "18px",
		borderRadius: "18px	!important",
		padding: "2px 6px !important",
		fontWeight: "bold",
		"&:hover": {
			backgroundColor: "#00000015 !important",
			transitionDuration: "0.35s",
		}
	},

	roundedTextField: {
		"& > div": {
			height: "32px",
			marginTop: "2px",
			marginBottom: "0px",
		},
		"& fieldset": {
			borderRadius: "50px !important",
		},
		"& input": {
			paddingTop: "4px",
			paddingBottom: "4px",
		}
	}
});

const connector = connect(
	(state: ApplicationState) => ({
		token: state.app.token,
	}), 
	{
		changeOpenState,
	}
);

function CreatePost({
	token,
	changeOpenState,
}: ConnectedProps<typeof connector>): ReactElement {
	const styles = useStyles();

	return (
		<CustomCard>
			<CardContent sx={{ display: "flex" }}>
				<Avatar></Avatar>
				<ButtonBase className={styles.createTextPost} onClick={() => changeOpenState(true)}>
					Bạn muốn chia sẻ với mọi người gì thế?
				</ButtonBase>
			</CardContent>
			<Divider variant="middle" />
			<CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", p: "10px" }}>
				<ButtonBase className={styles.createOtherPost} >
					<VideocamOutlined sx={{ mr: "5px" }} color="error" />
					Đăng video
				</ButtonBase>
				<ButtonBase className={styles.createOtherPost}>
					<PhotoLibraryOutlined sx={{ mr: "5px" }} color="success" />
					Đăng ảnh
				</ButtonBase>
				<ButtonBase className={styles.createOtherPost}>
					<FlagOutlined sx={{ mr: "5px" }} color="info" />
					Sự kiện
				</ButtonBase>
			</CardContent>
		</CustomCard >
	);
}

export default connector(CreatePost);