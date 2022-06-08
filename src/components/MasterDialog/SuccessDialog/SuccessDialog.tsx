import { Alert, AlertTitle, DialogContent, DialogTitle, Typography } from "@mui/material";
import { ReactElement } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ApplicationState } from "../../../store";

const connector = connect(
	(state: ApplicationState) => ({
		title: state.masterDialog.title,
		content: state.masterDialog.content,
	}),
	{}
);

function SuccessDialog({
	title,
	content,
}: ConnectedProps<typeof connector>): ReactElement {
	console.log(title, content);
	return (
		<>
			<DialogContent>
				<Alert severity="success">
					<AlertTitle sx={{ fontWeight: "bold" }}>{title}</AlertTitle>
					{content}
					<br />
				</Alert>
			</DialogContent>
		</>
	);
}

export default connector(SuccessDialog);