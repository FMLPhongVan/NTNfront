import { Alert, AlertTitle, Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { ReactElement } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ApplicationState } from "../../../store";
import { changeOpenState as changeDialogOpenState } from "../../../store/actions/masterDialog/changeOpenState";

const connector = connect(
	(state: ApplicationState) => ({
		title: state.masterDialog.title,
		content: state.masterDialog.content,
	}),
	{
		changeDialogOpenState,
	}
);

function ConfirmDialog({
	title,
	content,
	changeDialogOpenState,
}: ConnectedProps<typeof connector>): ReactElement {
	console.log(title, content);
	return (
		<>
			<DialogContent>
				<Alert severity="error">
					<AlertTitle sx={{ fontWeight: "bold" }}>{title}</AlertTitle>
					{content}
					<br />
					Vui lòng thử lại
				</Alert>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => changeDialogOpenState(false)}>Thử lại</Button>
			</DialogActions>
		</>
	);
}

export default connector(ConfirmDialog);