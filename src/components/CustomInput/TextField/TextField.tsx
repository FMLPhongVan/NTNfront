import { TextField } from "@mui/material";
import { ReactElement } from "react";

interface ICustomTFProps {
	name: string;
	label: string;
	value: string | number | object | boolean | unknown;
	type: string;
	error: {
		error: boolean;
		helperText: string;
	}
	onChange: () => void;
}

export default function Textfield(props: any): ReactElement {
	const { 
		type = "text", 
		required = false,  
		name, 
		label, 
		value, 
		error = null, 
		onChange,
		...others 
	} = props;

	return (	
		<TextField 
			type={type}
			variant="standard"
			required={required}
			fullWidth
			margin="normal"
			label={label}
			name={name}
			value={value}
			onChange={onChange}
			{...(error && { error: true, helperText: error })}
			{...others}
		/>
	);
}