import { ButtonBase } from "@mui/material";
import { Box } from "@mui/system";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import "../../assets/style/NotFoundPageStyle.css";

export default function NotFoundPage(): ReactElement {
	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center"
		}}>
			<div className="number">404</div>
			<div className="text">
				<span>Ooops...</span>
				<br />Page not found
			</div>
			<div>
				<ButtonBase sx={{ margin: "100px" }}>
					<Link className="link" to="/home"> Back to Home Page</Link>
				</ButtonBase>
			</div>
		</Box >
	);
}