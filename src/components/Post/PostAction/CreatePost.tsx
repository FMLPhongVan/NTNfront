import React, { ReactElement, useState } from "react";
import {
	styled,
	Card,
	CardContent,
	Avatar,
	Button,
	ButtonBase,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	TextareaAutosize,
	Chip,
	Paper,
	TextField,
	IconButton,
	InputAdornment,
	Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { ApplicationState } from "../../../store";
import { connect, ConnectedProps } from "react-redux";
import { Visibility, VisibilityOff, AddCircleRounded, Label, CloseRounded } from "@mui/icons-material";

const CustomCard = styled(Card)`
	height: 150px;
	width: 640px !important;
	margin: auto;
	margin-top: 1rem;
	margin-bottom: 1rem;
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

const ListItem = styled("li")(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

interface Hashtag {
	label: string;
}

const connector = connect(
	(state: ApplicationState) => ({
		token: state.app.token,
	})
);

function CreatePost({
	token,
}: ConnectedProps<typeof connector>): ReactElement {
	const styles = useStyles();

	const [content, setContent] = useState<string>("");
	const [hashtags, setHashtags] = useState<Hashtag[]>([]);
	const [newHashtag, setNewHashtag] = useState<Hashtag>({ label: "" });
	const [showTextPost, setShowTextPost] = React.useState(false);

	const handleOpenTextPost = () => {
		setShowTextPost(true);
	};

	const handleChangeContent = (event: any) => {
		setContent(event.target.value);
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

	const handleClickCreatePost = () => {
		const authToken = `Bearer ${token}`;

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore: dfwfsdfsdf
		console.log(document.getElementById("anh").files[0]);

		const tmp = {
			content: content,
			tags: hashtags.map(hashtag => hashtag.label),
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			image: document.getElementById("anh").files[0],
		};

		console.log(tmp);

		const formData = new FormData();
		formData.append("content", content);
		hashtags.map((hashtag, index) => {
			formData.append(`tags[${index}]`, `${hashtag.label}`);
		});
		formData.append("image", tmp.image);

		console.log(formData);

		fetch("http://127.0.0.1:8000/api/post/create", {
			method: "POST",
			mode: "cors",
			headers: {
				//"Content-Type": "multipart/form-data",
				"Accept": "application/json",
				"Authorization": authToken,
			},
			body: formData,
		}).then(res => {
			console.log(res.status);
			return res.json();
		}).then(data => {
			console.log(data);
		});
	};

	const handleCloseTextPost = () => {
		setShowTextPost(false);
	};

	return (
		<CustomCard>
			<CardContent sx={{ display: "flex" }}>
				<Avatar></Avatar>
				<ButtonBase className={styles.createTextPost} onClick={handleOpenTextPost}>
					Bạn muốn chia sẻ với mọi người gì thế?
				</ButtonBase>
				<Dialog
					open={showTextPost}
					onClose={handleCloseTextPost}
					PaperProps={{
						style: {
							height: "fit-content",
							width: "45rem",
							alignItems: "center",
						},
					}}
				>
					<DialogTitle fontWeight="bold">
						{"Tạo bài viết"}
					</DialogTitle>
					<DialogContent sx={{ p: 0, width: "100%" }}>
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
						<Divider variant="middle"/>
						<Box
							sx={{
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
							<li className={styles.roundedTextField}>
								<TextField
									placeholder="Thêm hashtag" 
									variant="outlined" 
									size="small" 
									value={newHashtag.label}
									onChange={handleChangeNewHashtag}
									className={styles.roundedTextField}
									sx={{ width: "12rem" }}
									inputProps={{ maxLength: 64 }}
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
								/>
							</li>
						</Box>
					</DialogContent>
					<DialogActions sx={{ width: "100%" }}>
						<Button 
							sx={{ width: "100%", fontWeight: "bold" }}
							onClick={handleClickCreatePost}
							disabled={content.length === 0 || hashtags.length === 0}
						>
							Đăng
						</Button>
					</DialogActions>
				</Dialog>
			</CardContent>
			<Divider variant="middle" />
			<CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", p: "10px" }}>
				<ButtonBase className={styles.createOtherPost} >
					<VideocamOutlinedIcon sx={{ mr: "5px" }} color="error" />
					Đăng video
				</ButtonBase>
				<ButtonBase className={styles.createOtherPost}>
					<PhotoLibraryOutlinedIcon sx={{ mr: "5px" }} color="success" />
					Đăng ảnh
				</ButtonBase>
				<ButtonBase className={styles.createOtherPost}>
					<FlagOutlinedIcon sx={{ mr: "5px" }} color="info" />
					Sự kiện
				</ButtonBase>
			</CardContent>
		</CustomCard >
	);
}

export default connector(CreatePost);