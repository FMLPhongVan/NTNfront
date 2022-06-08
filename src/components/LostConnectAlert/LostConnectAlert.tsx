import { Snackbar, Alert } from "@mui/material";
import { ReactElement } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ApplicationState } from "../../store";
import { changeOpenLostConnectAlert } from "../../store/actions/app/changeOpenLostConnetAlert";

const connector = connect(
	(state: ApplicationState) => ({
		open: state.app.openLostConnectAlert,
	}),
	{
		changeOpenLostConnectAlert,
	}
);

function LostConnectAlert({
	open,
	changeOpenLostConnectAlert,
}: ConnectedProps<typeof connector>): ReactElement {
	const handleClickCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return ;
		}

		changeOpenLostConnectAlert(false);
	};

	console.log(open);

	return (
		<Snackbar 
			anchorOrigin={{vertical: "top", horizontal: "center"}} 
			open={open} 
			onClose={handleClickCloseError}
		>
			<Alert onClose={handleClickCloseError} severity="error" sx={{ width: "100%" }}>
				Mất kết nối với máy chủ !!!
			</Alert>
		</Snackbar>
	);
}

export default connector(LostConnectAlert);