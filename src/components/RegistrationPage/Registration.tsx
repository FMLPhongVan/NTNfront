import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Box,
	Typography,
	InputAdornment,
	IconButton,
	Grid,
	Button,
	Avatar
} from "@mui/material";
import { ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStyle } from "./RegistrationStyle";
import { CustomInput } from "../CustomInput/CustomInput";
import { useForm } from "../../hooks/useForm";
import { IGender } from "../../constants/IGender";
import { Copyright } from "../Copyright";
import { containAZ, containaz, containNum, containOther, containSpec, isValidEmail, isValidName } from "../../utils/validation";
import { connect, ConnectedProps } from "react-redux";
import { ApplicationState } from "../../store";
import { saveUserDataInCookies } from "../../store/actions/app/saveUserDataInCookies";

const genderItems: Array<IGender> = [
	{ id: 0, title: "Nam", value: 0 },
	{ id: 1, title: "Nữ", value: 1 },
	{ id: 2, title: "Khác", value: 2 }
];

const connector = connect(
	(state: ApplicationState) => ({

	}),
	{
		saveUserDataInCookies,
	}
);

function Registration({
	saveUserDataInCookies,
}: ConnectedProps<typeof connector>): ReactElement {
	const styles = useStyle();
	const navigate = useNavigate();

	const validate = (fieldValues = values) => {
		const tmp = { ...errors };

		if ("firstName" in fieldValues) {
			tmp.firstName = "";
			if (fieldValues.firstName.length > 0) {
				tmp.firstName = isValidName(fieldValues.firstName) ? "" : "Họ của bạn không hợp lệ";
			}
		}
		if ("middleName" in fieldValues) {
			tmp.middleName = "";
			if (fieldValues.middleName.length > 0) {
				tmp.middleName = isValidName(fieldValues.middleName) ? "" : "Đệm của bạn không hợp lệ";
			}
		}
		if ("lastName" in fieldValues) {
			tmp.lastName = "";
			if (fieldValues.lastName.length == 0) tmp.lastName = "Vui lòng điền tên của bạn";
			else if (!isValidName(fieldValues.lastName)) tmp.lastName = "Tên của bạn không hợp lệ";
		}
		if ("dob" in fieldValues) {
			tmp.dob = "";
			const today = new Date();
			if (fieldValues.dob > today) tmp.dob = "Bạn đến từ tương lai ????";
			else if (fieldValues.dob == today) tmp.dob = "Bạn vừa mới chào đời ư !!!!";
		}
		if ("email" in fieldValues) {
			tmp.email = "";
			if (fieldValues.email.length == 0) tmp.email = "Vui lòng điền email của bạn";
			else if (!isValidEmail(fieldValues.email)) tmp.email = "Email của bạn không hợp lệ";
		}
		if ("username" in fieldValues) {
			tmp.username = "";
			const isContainaz = containaz(fieldValues.username);
			const isContainAZ = containAZ(fieldValues.username);
			const isContainNum = containNum(fieldValues.username);
			const isContainSpec = containSpec(fieldValues.username);
			if (fieldValues.username.length == 0) tmp.username = "Vui lòng điền tài khoản của bản";
			else if (fieldValues.username.length < 8) tmp.username = "Tài khoản phải có ít nhất 8 ký tự";
			else if ((!isContainaz) && (!isContainAZ)) tmp.username = "Tài khoản của bạn phải chứa chữ cái";
			else if ((!isContainNum) && (!isContainSpec)) tmp.username = "Tài khoản của bạn phải chứa ít nhất 1 ký tự chữ số hoặc 1 ký tự đặc biệt (_, !, @, #, $, ^, &, .)";
			else if (containOther(fieldValues.username)) tmp.username = "Tài khoản của bạn chứa ký tự không hợp lệ";
		}
		if ("password" in fieldValues) {
			tmp.password = "";
			const isContainaz = containaz(fieldValues.password);
			const isContainAZ = containAZ(fieldValues.password);
			const isContainNum = containNum(fieldValues.password);
			const isContainSpec = containSpec(fieldValues.password);
			if (fieldValues.password.length == 0) tmp.password = "Vui lòng điền mật khẩu của bản";
			else if (fieldValues.password.length < 8) tmp.password = "Mật khẩu phải có ít nhất 8 ký tự";
			else if ((!isContainaz) || (!isContainAZ)) tmp.password = "Mật khẩu của bạn phải chứa chữ cái viết hoa và viết thường";
			else if ((!isContainNum) || (!isContainSpec)) tmp.password = "Mật khẩu của bạn phải chứa ít nhất 1 ký tự chữ số và 1 ký tự đặc biệt (_, !, @, #, $, ^, &, .)";
			else if (containOther(fieldValues.password)) tmp.password = "Mật khẩu của bạn chứa ký tự không hợp lệ";
		}
		if ("repassword" in fieldValues) {
			tmp.repassword = "";
			if (fieldValues.repassword.length == 0) tmp.repassword = "Vui lòng nhập lại mật khẩu của bạn";
			else if (fieldValues.repassword !== values.password) tmp.repassword = "Mật khẩu nhập lại không giống";
		}

		setErrors({ ...tmp });
		if (fieldValues == values) {
			tmp.gender = "";
			return Object.values(tmp).every((x) => x == "");
		}
	};

	const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
		useForm(
			{
				firstName: "",
				middleName: "",
				lastName: "",
				dob: null,
				gender: 0,
				username: "",
				email: "",
				password: "",
				repassword: "",
			},
			true,
			validate
		);

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleClickSignUp = () => {
		if (validate(values)) {
			console.log(values);
			const requestBody = {
				"username": values.username,
				"first_name": values.firstName,
				"surname": values.middleName,
				"last_name": values.lastName,
				"birthday": values.dob.toISOString().slice(0, 10),
				"gender": values.gender,
				"email": values.email,
				"password_confirmation": values.repassword,
				"password": values.password,
			};
			console.log(requestBody);
			fetch("http://127.0.0.1:8000/api/register", {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-cache",
					"Accept": "application/json",
				},
				body: JSON.stringify(requestBody),
			})
				.then(res => {
					console.log(res);
					return res.json();
				})
				.then(data => {
					console.log(data);
					if ("errors" in data) {
						console.log(1);
					} else {
						saveUserDataInCookies(data);
						navigate("/home");
					}
				});
		}
	};

	return (
		<>
			<Box className={styles.root}>
				<Box
					className={styles.loginBox}
					component="form"
				>
					<Typography
						sx={{
							textAlign: "center",
							mb: 1,
						}}
						variant="h5"
					>
						Đăng ký
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<CustomInput.TextField
								name="firstName"
								label="Họ"
								value={values.firstName}
								error={errors.firstName}
								onChange={handleInputChange}
								inputProps={{ maxLength: "32" }}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<CustomInput.TextField
								name="middleName"
								label="Đệm"
								value={values.middleName}
								error={errors.middleName}
								onChange={handleInputChange}
								inputProps={{ maxLength: "32" }}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<CustomInput.TextField
								required
								name="lastName"
								label="Tên"
								value={values.lastName}
								error={errors.lastName}
								onChange={handleInputChange}
								inputProps={{ maxLength: "32" }}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomInput.DatePicker
								label="Ngày sinh"
								value={values.dob}
								error={errors.dob}
								onChange={(dob: any) => {
									if (dob === null) return;
									console.log(dob);
									validate({ dob: dob });
									setValues({
										...values,
										dob: dob,
									});
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomInput.RadioGroup
								name="gender"
								label="Giới tính"
								value={values.gender}
								onChange={handleInputChange}
								items={genderItems}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Grid item xs={12}>
								<CustomInput.TextField
									required
									margin="none"
									name="email"
									label="Email"
									value={values.email}
									error={errors.email}
									onChange={handleInputChange}
									inputProps={{ maxLength: "128" }}
								/>
							</Grid>
							<Grid item xs={12}>
								<CustomInput.TextField
									required
									name="username"
									label="Tài khoản"
									value={values.username}
									error={errors.username}
									onChange={handleInputChange}
									inputProps={{ maxLength: "64" }}
								/>
							</Grid>
							<Grid item xs={12}>
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
							</Grid>
							<Grid item xs={12}>
								<CustomInput.TextField
									required
									type={showPassword ? "text" : "password"}
									disabled={values.password.length == 0}
									name="repassword"
									label="Nhập lại mật khẩu"
									value={values.repassword}
									error={errors.repassword}
									onChange={handleInputChange}
									inputProps={{ maxLength: "64" }}
								/>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Avatar
								src={require("../../assets/imgs/photo-1535713875002-d1d0cf377fde.jpeg")}
								sx={{ width: 180, height: 180, margin: "auto" }}
							/>
							<div>
								<Button variant="text" fullWidth sx={{ textTransform: "none", mt: 2 }}>Thay ảnh đại diện</Button>
							</div>
						</Grid>
					</Grid>
					<Button
						fullWidth
						variant="contained"
						sx={{ my: 2, p: 1, fontWeight: "bold" }}
						className={styles.loginBtn}
						onClick={handleClickSignUp}
					>Đăng ký</Button>
					<Typography
						sx={{
							textAlign: "center",
						}}
						variant="body1"
					>
						Bạn đã có tài khoản ?
					</Typography>
					<Button
						fullWidth
						variant="outlined"
						sx={{ my: 2, p: 1, fontWeight: "bold", borderWidth: "2px" }}
						className={styles.loginBtn}
						component={Link} to="/login"
					>
						Đăng nhập
					</Button>
					<Copyright sx={{ mt: 1, mb: 0 }} />
				</Box>
			</Box>
		</>
	);
}

export default connector(Registration);