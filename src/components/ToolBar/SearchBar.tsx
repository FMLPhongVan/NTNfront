import React, { ReactElement, useEffect } from "react";
import {
	styled,
	InputBase,
	List, ListItem,
	ListItemButton,
	ListItemText,
	ListItemAvatar,
	Avatar,
	ClickAwayListener,
	Typography,
	ListItemSecondaryAction,
	ListSubheader,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ApplicationState } from "../../store";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
	zIndex: 1000,
	borderRadius: theme.shape.borderRadius,
	backgroundColor: "#f5f5f5",
	"&:hover": {
		backgroundColor: "#00000015",
	},
	transitionDuration: "0.35s",
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	height: "100%",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

const connector = connect((state: ApplicationState) => ({
	token: state.app.token,
}), {});

function SearchBar({
	token,
}: ConnectedProps<typeof connector>): ReactElement {

	const [suggestSearch, setSuggestSearch] = React.useState<any>([]);
	const [inputValue, setinputValue] = React.useState("");
	const [showSuggest, setShowSuggest] = React.useState(false);

	const handleSearching = (event: any) => {
		handleTyping;
		setinputValue(event.target.value);
		const searchContent = event.target.value;
		const hashtag = searchContent.substring(1, searchContent.length);
		const userName = searchContent.substring(1, searchContent.length);
		if (searchContent == "") {
			setSuggestSearch([]);
		}

		const authToken = `Bearer ${token}`;
		if (searchContent[0] == "#") {
			if (hashtag.length > 0) {
				fetch(`http://127.0.0.1:8000/api/post/get/tags/${hashtag}`, {
					method: "GET",
					mode: "cors",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						"Authorization": authToken,
					},
				}).then(res => {
					console.log(res);
					return res.json();
				}).then((data) => {
					if (data.length > 0) {
						setSuggestSearch(data.slice(0, 8));
						console.log(data);
					} else {
						setSuggestSearch([]);
					}
				});
			}
		}
		if (searchContent[0] == "@") {
			if (hashtag.length > 0) {
				fetch(`http://127.0.0.1:8000/api/profile/get/${userName}`, {
					method: "GET",
					mode: "cors",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						"Authorization": authToken,
					},
				}).then(res => {
					console.log(res);
					return res.json();
				}).then((data) => {
					if (data.length > 0) {
						setSuggestSearch(data.slice(0, 8));
						console.log(data);
					} else {
						setSuggestSearch([]);
					}
				});
			}

		}
	};

	const handleClick = () => {
		setShowSuggest(true);
	};

	const handleTyping = () => {
		setShowSuggest(true);
	};

	const handleClickAway = () => {
		setShowSuggest(false);
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Search sx={{ display: "inline-flex" }} onClick={handleClick}>
				<SearchIconWrapper sx={{ height: "39px", padding: "0px 12px" }}>
					<SearchIcon />
				</SearchIconWrapper>
				<StyledInputBase placeholder="Tìm kiếm…" value={inputValue}
					onChange={handleSearching} onKeyDown={() => setShowSuggest(true)} />
				{showSuggest ? (
					<List onClick={handleClick}
						dense
						sx={{
							width: "233.962px", bgcolor: "background.paper", position: "fixed", top: "48px",
							boxShadow: 1
						}}>
						<ListSubheader sx={{ fontSize: "1rem", lineHeight: "1.25rem", position: "relative" }}>
							<strong>Kết quả tìm kiếm cho: </strong> {inputValue}
						</ListSubheader>
						{suggestSearch.map((value: any) => {
							const labelId = `${value}`;
							return (
								<ListItem
									key={value}
									disablePadding >
									<ListItemButton >
										<ListItemAvatar>
											<Avatar />
										</ListItemAvatar>
										{inputValue[0] == "#" ?
											(<ListItemText id={labelId}
												secondaryTypographyProps={{ style: { overflow: "hidden" } }}
												primary={`@${value.user.username}`}
												secondary={`${value.content.substring(0, 50)}` + (value.content.length > 49 ? "..." : "")} />)
											: (<Link style={{ textDecoration: "none" }} to={`/profile/${value.username}`}>
												<ListItemText id={labelId}
													secondaryTypographyProps={{ style: { overflow: "hidden" } }}
													primary={`@${value.username}`}
													secondary={`${value.profile.first_name} ${value.profile.surname} ${value.profile.last_name}`} />
											</Link>)
										}
									</ListItemButton>
								</ListItem>
							);
						})}
					</List>) : null}
			</Search>
		</ClickAwayListener >
	);
} export default connector(SearchBar);
