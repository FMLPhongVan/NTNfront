import { Dialog } from "@mui/material";
import { ReactElement } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ApplicationState } from "../../store";
import { changeOpenState as changeDialogOpenState } from "../../store/actions/masterDialog/changeOpenState";
import { DialogContents, DialogContentType } from "./DialogContent";

const connector = connect(
	(state: ApplicationState) => ({
		openState: state.masterDialog.openState,
		contentType: state.masterDialog.contentType,
		closeMethod: state.masterDialog.closeMethod,
	}),
	{
		changeDialogOpenState,
	}
);

function MasterDialog({
	openState,
	contentType,
	closeMethod,
	changeDialogOpenState
}: ConnectedProps<typeof connector>): ReactElement {
	console.log(contentType);
	return (
		<Dialog open={openState} 
			onClose={(event, reason) => closeMethod(reason)}
		>
			{DialogContents[contentType]}
		</Dialog>
	);
}

export default connector(MasterDialog);