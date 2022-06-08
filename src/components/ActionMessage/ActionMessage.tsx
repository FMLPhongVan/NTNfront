import React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from "@mui/material";
import { Box } from "@mui/system";


export default function ActionMessage(props: any) {
	const { open, success, message, onClose } = props;

	const handleClose = () => {
		onClose();
	};

	const handleAccept = () => {
		onClose();
	};

	const handleRetry = () => {
		onClose();
	};

	const handleSkip = () => {
		onClose();
	};

	return (
		<Dialog open={open}>
			<DialogTitle sx={{ fontWeight: "bold", alignSelf: "center" }}>Thông báo</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{success ? (
					<Button onClick={handleAccept}>Đồng ý</Button>
				) : (
					<Box>
						<Button autoFocus onClick={handleRetry}> Thử lại </Button>
						<Button onClick={handleSkip}> Bỏ qua </Button>
					</Box>
				)}
			</DialogActions>
		</Dialog >
	);

}