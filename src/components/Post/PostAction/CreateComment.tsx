import { ReactElement, useState } from "react";
import {
	styled,
	InputBase,
	Avatar,
	Box,
	IconButton,
} from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import { connect, ConnectedProps } from "react-redux";
import { ApplicationState } from "../../../store";

const CommentBox = styled(InputBase)`
	background: #f5f5f5 !important;
	padding-left: 1.5rem !important;
	border-radius: 25px !important;
	margin: 0 1rem !important;
	font-size: 1rem;
	font-weight: medium;
	height: 40px;
	min-width: 500px;
	justify-content: flex-start !important;
	transition-duration: 0.35s;
	"&:hover": {
		background-color: #00000015 !important;
		transition-duration: 0.35s;
	}
`;

const connector = connect(
	(state: ApplicationState) => ({
		token: state.app.token,
	}), {}
);

function CreateComment(props: any): ReactElement {
	const { token, ...others } = props;
	const authToken = `Bearer ${token}`; 
	const [content, setContent] = useState("");

	const handleClickSend = () => {
		fetch(`http://127.0.0.1:8000/api/comments/${props.postId}`, {
			method: "POST",
			mode: "cors",
			headers: {
				"Authorization": authToken,
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({ content: content })
		}).then(res => res.json())
			.then(data => {
				setContent("");
				props.onNewCommentCreated(data);
			});
	};

	return (
		<Box sx={{ display: "flex", my: "0.5rem" }}>
			<Avatar></Avatar>
			<CommentBox 
				placeholder="Viết bình luận..."
				value={content}
				onChange={(event) => setContent(event.target.value)}
			/>
			<IconButton disabled={content === ""} onClick={handleClickSend}>
				<SendRounded color={content !== "" ? "primary": "disabled"}/>
			</IconButton>
		</Box>
	);
}

export default connector(CreateComment);