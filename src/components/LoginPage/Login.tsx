import {
	Box,
	Button,
	Grid,
	Link as LinkMUI,
	Typography,
	FormControlLabel,
	Checkbox,
	InputAdornment,
	IconButton,
	useMediaQuery,
	Alert,
	Snackbar
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CustomTextField from "../CustomInput/TextField/TextField";
import {
	Lock,
	Person,
	Visibility,
	VisibilityOff
} from "@mui/icons-material";
import { useForm } from "../../hooks/useForm";
import { Copyright } from "../Copyright";
import { useStyle } from "./LoginStyle";
import { CustomInput } from "../CustomInput/CustomInput";
import { connect, ConnectedProps } from "react-redux";
import { ApplicationState } from "../../store";
import { changeOpenLostConnectAlert } from "../../store/actions/app/changeOpenLostConnetAlert";
import { saveUserDataInCookies } from "../../store/actions/app/saveUserDataInCookies";
import { changeOpenState as changeDialogOpenState } from "../../store/actions/masterDialog/changeOpenState";
import { setDialogContent } from "../../store/actions/masterDialog/setDialogContent";
import { DialogContentType } from "../MasterDialog/DialogContent";

const connector = connect(
	(state: ApplicationState) => ({
		isLoggedIn: state.app.isLoggedIn,
		mainPagePath: state.app.mainPagePath,
	}),
	{
		changeOpenLostConnectAlert,
		saveUserDataInCookies,
		changeDialogOpenState,
		setDialogContent,
	}
);

function Login({
	isLoggedIn,
	mainPagePath,
	changeOpenLostConnectAlert,
	saveUserDataInCookies,
	changeDialogOpenState,
	setDialogContent,
}: ConnectedProps<typeof connector>): ReactElement {
	const styles = useStyle();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/home");
		}
	}, [isLoggedIn]);

	const validate = (fieldValues = values) => {
		const tmp = { ...errors };

		if ("username" in fieldValues) {
			tmp.username = fieldValues.username.length > 0 ? "" : "Vui lòng điền tài khoản của bạn";
		}

		if ("password" in fieldValues) {
			tmp.password = fieldValues.password.length > 0 ? "" : "Vui lòng điền mật khẩu của bạn";
		}

		setErrors({ ...tmp });
		if (fieldValues == values) {
			return Object.values(tmp).every((x) => x == "");
		}
	};

	const { values, errors, setErrors, handleInputChange, resetForm } =
		useForm(
			{
				username: "",
				password: "",
			},
			true,
			validate
		);

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showError, setShowError] = useState<boolean>(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleClickSubmit = () => {
		if (validate(values)) {
			console.log(values);
			fetch("http://127.0.0.1:8000/api/login", {
				method: "POST",
				mode: "cors",
				headers: {
					"Authorization": "Bearer c1ed53c92a5be2cf2309f4c06b9a44bbf82e6c367d814c01442417ebb39a6321",
					"Cache-Control": "no-cache",
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				body: JSON.stringify(values),
			})
				.then(res => {
					console.log(res.status);
					return res.json();
				})
				.then(data => {
					console.log(data);
					if ("error" in data) {
						console.log(1);
						setDialogContent(
							"Đăng nhập không thành công",
							"Tài khoản hoặc mật khẩu của bạn không đúng."
						);
						changeDialogOpenState(true, DialogContentType.ERROR_DIALOG);
					} else {
						console.log(values.username);	
						setDialogContent(
							"Đăng nhập thành công",
							`Chào mừng quay trở lại @${values.username}`
						);
						setTimeout(() => {
							saveUserDataInCookies({
								token: data.token,
								userId: data.user.id,
								username: data.user.username,
							});
							resetForm();
							changeDialogOpenState(false);
							navigate("/home");
						}, 1500);
						changeDialogOpenState(
							true, 
							DialogContentType.SUCCESS_DIALOG,
							(reason) => {
								if (reason === "backdropClick" || reason === "escapeKeyDown") {
									return;
								}
							}
						);
					}
				}).catch(errors => {
					console.log(errors);
					changeOpenLostConnectAlert(true);
					setShowError(true);
				});
		}
	};

	return (
		<>
			<Box className={styles.root}>
				<Box
					className={styles.loginBox}
					component="form"
					onKeyDown={(event: React.KeyboardEvent) => {
						if (event.code === "Enter") {
							handleClickSubmit();
						}
					}}
				>
					<Typography
						sx={{
							textAlign: "center",
							mb: 2,
						}}
						variant="h5"
					>
						Chào mừng đến với NTN
					</Typography>
					<div>
						<CustomInput.TextField
							required
							label="Tài khoản"
							name="username"
							value={values.username}
							error={errors.username}
							onChange={handleInputChange}
							autoFocus
							autoComplete="username"
							inputProps={{ maxLength: "64" }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start"><Person /></InputAdornment>
								),
							}}
						/>
					</div>
					<div>
						<CustomInput.TextField
							required
							type={showPassword ? "text" : "password"}
							label="Mật khẩu"
							name="password"
							value={values.password}
							error={errors.password}
							onChange={handleInputChange}
							inputProps={{ maxLength: "64" }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start"><Lock /></InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</div>
					<Grid container>
						<Grid item xs>
							<FormControlLabel
								control={<Checkbox />}
								label="Duy trì đăng nhập"
							/>
						</Grid>
						<Grid item marginY="auto">
							<LinkMUI variant="body1">Quên mật khẩu ?</LinkMUI>
						</Grid>
					</Grid>
					<Button
						fullWidth
						variant="contained"
						sx={{ my: 2, p: 1, fontWeight: "bold" }}
						className={styles.loginBtn}
						onClick={handleClickSubmit}
					>Đăng nhập</Button>
					<Typography
						sx={{
							textAlign: "center",
						}}
						variant="body1"
					>
						Bạn chưa có tài khoản ?
					</Typography>
					<Button
						fullWidth
						variant="outlined"
						sx={{ my: 2, p: 1, fontWeight: "bold", borderWidth: "2px" }}
						className={styles.loginBtn}
						component={Link} to="/registration"
					>
						Tạo tài khoản mới
					</Button>
					<Copyright sx={{ mt: 4, mb: 1 }} />
				</Box>
			</Box>
		</>
	);
}

export default connector(Login);