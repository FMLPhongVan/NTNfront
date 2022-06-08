import { AddCircleRounded, AddPhotoAlternateOutlined, CloseOutlined, SaveRounded } from "@mui/icons-material";
import { 
	styled,
	Box, 
	Button, 
	Chip, 
	Dialog, 
	DialogActions, 
	DialogContent, 
	DialogTitle, 
	Divider, 
	IconButton, 
	InputAdornment,
	TextareaAutosize, 
	TextField,
	ButtonBase, 
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ReactElement, useEffect, useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ApplicationState } from "../../../store";
import { changeIsNewPostUp } from "../../../store/actions/createPost/changeIsNewPostUp";
import { changeOpenState } from "../../../store/actions/updatePost/changeOpenState";
import { createNewPost } from "../../../store/actions/createPost/createNewPost";
import { 
	changeOpenState as changeMasterDialogOpenState 
} from "../../../store/actions/masterDialog/changeOpenState";
import { setDialogContent } from "../../../store/actions/masterDialog/setDialogContent";
import { DialogContentType } from "../../MasterDialog/DialogContent";
import { setData } from "../../../store/actions/updatePost/setData";

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
	},
	customScrollBar: {
		"&::-webkit-scrollbar": {
			width: "5px",
		},
		"&::-webkit-scrollbar-track": {
			background: "#f1f1f1",
		},
		"&::-webkit-scrollbar-thumb": {
			background: "#888",
		},
		"&::-webkit-scrollbar-thumb:hover": {
			background: "#555",
		}
	},
	previewImage: {
		width: "100%",
		textAlign: "center",
		"& > img": {
			width: "calc(100% - 1rem)",
		}
	},
	closeImageBut: {
		float: "right",
		position: "absolute",
		right: "10px",
		top: "42px",
		"&:hover": {
			backgroundColor: "rgba(0, 0, 0, 0.5) !important"
		}
	}
});

const Input = styled("input")({
	display: "none",
});

const ListItem = styled("li")(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

const connector = connect(
	(state: ApplicationState) => ({
		token: state.app.token,
		open: state.updatePost.openUpdatePostDialog,
		postContent: state.updatePost.content,
		postId: state.updatePost.postId,
	}),
	{
		changeOpenState,
		changeMasterDialogOpenState, 
		setDialogContent,
		changeIsNewPostUp,
		setData,
	}	
);

export interface Hashtag {
	label: string;
}

function UpdatePostDialog({
	token, 
	open,
	postContent,
	postId,
	changeOpenState,
	changeMasterDialogOpenState,
	setDialogContent,
	changeIsNewPostUp,
	setData,
}: ConnectedProps<typeof connector>): ReactElement {
	const styles = useStyles();
	const [content, setContent] = useState<string>(postContent);
	const [image, setImage] = useState({ path: "", file: null });
	const [hashtags, setHashtags] = useState<Hashtag[]>([]);
	const [newHashtag, setNewHashtag] = useState<Hashtag>({ label: "" });

	useEffect(() => {
		setContent(postContent);	
	}, [open]);

	const handleChangeContent = (event: any) => {
		setContent(event.target.value);
	};

	const onImageChange = (event: any) => {
		if (event.target.files && event.target.files[0]) {
			const img = event.target.files[0];
			if (img.type === "image/jpeg" || img.type === "image/png" || img.type === "image/jpg") {
				console.log(img);
				setImage({
					path: URL.createObjectURL(img),
					file: img,
				});
			} else {
				setDialogContent(
					"Không thể tải ảnh",
					"Bạn chỉ có thể đăng file ảnh có đuôi jpeg, jpg, png."
				);
				changeMasterDialogOpenState(true, DialogContentType.ERROR_DIALOG);
			}
		}
	};

	const handleChangeNewHashtag = (event: any) => {
		setNewHashtag({ label: event.target.value.replace(" ", "")});
	};

	const handleClickAddHashtag = () => {
		if (hashtags.find(el => el.label === newHashtag.label) === undefined) {
			setHashtags([...hashtags, newHashtag]);	
			setNewHashtag({ label: "" });
		}
	};

	const handleDeleteHashtag = (deleteHashtag: Hashtag) => {
		setHashtags((hashtags) => hashtags.filter((hashtag) => hashtag.label !== deleteHashtag.label));
	};

	const resetForm = () => {
		setContent("");
		setHashtags([]);
		setImage({ path: "", file: null });
	};

	const handleClickSavePost = () => {
		const authToken = `Bearer ${token}`;
		fetch(`http://127.0.0.1:8000/api/post/edit/${postId}`, {
			method: "PUT", 
			mode: "cors",
			headers: {
				"Authorization": authToken,
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({ content: content })
		}).then(res => res.json())
			.then(data => {
				console.log(data);
				changeOpenState(false);
				setData("", 0);
				changeIsNewPostUp(true);
				console.log(1);
			})
			.catch(err => {
				console.log(err);
				changeMasterDialogOpenState(true, DialogContentType.ERROR_DIALOG);
				setDialogContent("Đăng bài không thành công", "Lỗi kết nối với máy chủ.");
			});
	};

	return (
		<Dialog
			open={open}
			onClose={() => changeOpenState(false)}
			PaperProps={{
				style: {
					height: "fit-content",
					width: "45rem",
					alignItems: "center",
				},
			}}
		>
			<DialogTitle fontWeight="bold">
				{"Chỉnh sửa bài viết"}
			</DialogTitle>
			<DialogContent sx={{ p: 0, width: "100%" }} className={styles.customScrollBar}>
				<Divider />
				<TextPostArea 
					minRows="10" 
					maxRows="10" 
					autoFocus
					placeholder="Chia sẻ với mọi người nào!"
					value={content}
					onChange={handleChangeContent} 
					sx={{
						width: "calc(100% - 1rem)",
						height: "fit-content",
						px: 0.5,
						mx: 0,
						ml: 1,
					}}
				/>
				{/* <Box>
					{image.path !== "" && (
						<div className={styles.previewImage}>
							<IconButton 
								className={styles.closeImageBut} 
								sx={{ backgroundColor: "black", color: "white" }}
								onClick={() => setImage({path: "", file: null})} 
							><CloseOutlined /></IconButton>
							<img src={image.path} alt="" />
						</div>
					)}
				</Box>
				<Divider variant="middle"/>
				<Box
					sx={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
						flexWrap: "wrap",
						listStyle: "none",
						p: 0.5,
						m: 0,
						overflow: "hidden"
					}}
					component="ul"
				>
					{hashtags.map((hashtag: Hashtag, index) => (
						<ListItem key={index}>
							<Chip color="primary"
								label={`#${hashtag.label}`}
								onDelete={() => handleDeleteHashtag(hashtag)}
							/>
						</ListItem>
					))}
				</Box> */}
			</DialogContent>
			<DialogActions sx={{ width: "100%", justifyContent: "space-between" }}>
				<div>
					<label htmlFor="img-upload">
						<Input accept="image/*" id="img-upload" multiple type="file" onChange={onImageChange} />
						<Button 
							variant="text" 
							component="div" 
							startIcon={<AddPhotoAlternateOutlined color="secondary" />}
							sx={{
								textTransform: "none"
							}}
							disabled
						>
							Thêm ảnh
						</Button>
					</label>
				</div>
				<div>
					<TextField
						placeholder="Thêm hashtag" 
						variant="outlined" 
						size="small" 
						value={newHashtag.label}
						onChange={handleChangeNewHashtag}
						className={styles.roundedTextField}
						sx={{ width: "12rem" }}
						inputProps={{ maxLength: 32 }}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end"> 
									<IconButton sx={{ px: 0 }} 
										disabled={newHashtag.label.length === 0} 
										onClick={handleClickAddHashtag}
									>
										<AddCircleRounded color="secondary" />
									</IconButton>
								</InputAdornment>
							)
						}}
						disabled
					/>
				</div>
				<div>
					<Button 
						sx={{ fontWeight: "bold", textTransform: "none", width: "106px" }}
						onClick={handleClickSavePost}
						disabled={content.length === 0}
						endIcon={<SaveRounded />}
						variant="contained"
					>
						Lưu
					</Button>
				</div>
			</DialogActions>
		</Dialog>
	);
}

export default connector(UpdatePostDialog);