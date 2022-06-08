import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { connect, ConnectedProps } from "react-redux";
import { ApplicationState } from "../../../store";
import { changeOpenState as changeOpenUpdatePostState } from "../../../store/actions/updatePost/changeOpenState";
import { setData } from "../../../store/actions/updatePost/setData";
import { changeIsNewPostUp } from "../../../store/actions/createPost/changeIsNewPostUp";

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
      theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
		boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity,
				),
			},
		},
	},
}));

const connector = connect(
	(state: ApplicationState) => ({
		token: state.app.token,
	}), 
	{ 
		changeIsNewPostUp,
		changeOpenUpdatePostState,
		setData,
	}
);

function PostAction(props: any) {
	const { changeIsNewPostUp, changeOpenUpdatePostState, setData, content, token } = props;
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	console.log(props);

	const handleClickDeletePost = () => {
		const authToken = `Bearer ${token}`;
		fetch(`http://127.0.0.1:8000/api/post/edit/${props.postId}`, {
			method: "DELETE",
			mode: "cors",
			headers: {
				"Authorization": authToken,
			}
		}).then(res => res.json())
			.then(data => {
				handleClose();
				changeIsNewPostUp(true);
			});
	};

	return (
		<div>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "demo-customized-button" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
				disabled={props.disabled}
			>
				<MoreVertIcon />
			</IconButton>
			<StyledMenu
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem 
					onClick={() => {
						setData(content, props.postId);
						changeOpenUpdatePostState(true);
						handleClose();
					}
					}	 
					disableRipple
				>
					<EditIcon />
					Chỉnh sửa
				</MenuItem>
				<MenuItem onClick={handleClickDeletePost} disableRipple>
					<DeleteRounded />
					Xoá
				</MenuItem>
			</StyledMenu>
		</div>
	);
}

export default connector(PostAction);