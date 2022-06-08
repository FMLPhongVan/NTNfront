import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader, Dialog,
	IconButton,
	Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";
import React from "react";

const useStyles = makeStyles({
	previewAvatar: {
		width: "100%",
		textAlign: "center",
		"& > img": {
			width: "calc(100% - 1rem)",
		}
	},
	closeAvatarButton: {
		float: "right",
		position: "absolute",
		right: "10px",
		top: "42px",
		"&:hover": {
			backgroundColor: "rgba(0, 0, 0, 0.5) !important"
		}
	}
});

export default function ProfileEditAvt(props: any) {

	const styles = useStyles();
	const { open, close } = props;
	const [avatar, setAvatar] = React.useState({ path: "", file: null });

	const handleClose = () => {
		close();
		setAvatar({ path: "", file: null });
	};

	const handleUploadAvt = () => {
		onAvatarChange;
	};

	const onAvatarChange = (event: any) => {
		if (event.target.files && event.target.files[0]) {
			const img = event.target.files[0];
			console.log(img);
			setAvatar({
				path: URL.createObjectURL(img),
				file: img,
			});
		}
	};

	const handleAccept = () => {
		handleClose();
	};
	return (
		<Dialog open={open} onClose={handleClose}>
			<Card sx={{ width: "25rem" }}>
				<Box display="inline-flex" justifyContent="space-between" width="100%">
					<CardHeader title={
						<Typography variant="h5" fontWeight="bold">
							Thay đổi ảnh đại diện
						</Typography>} />
					<CardActions>
						<IconButton onClick={handleClose}>
							<Close />
						</IconButton>
					</CardActions>
				</Box>
				<CardContent sx={{ justifySelf: "center" }}>
					{avatar.path !== "" && (
						<div className={styles.previewAvatar}>
							<IconButton
								className={styles.closeAvatarButton}
								sx={{ bgcolor: "black", color: "white" }}
								onClick={() => setAvatar({ path: "", file: null })}
							><Close /></IconButton>
							<img src={avatar.path} alt="" />
						</div>
					)}
				</CardContent>
				<CardActions sx={{ justifyContent: "end" }}>
					<label htmlFor="avt-upload">
						<Button component="div" onClick={handleUploadAvt}>
							Tải ảnh lên
						</Button>
					</label>
					<input style={{ display: "none" }} accept="image/*" id="avt-upload" multiple type="file" onChange={onAvatarChange} />
					<Button onClick={handleAccept}>
						Đồng ý
					</Button>
				</CardActions>
			</Card>
		</Dialog >
	);
}