import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as MuiRadioGroup } from "@mui/material";
import { ReactElement } from "react";

export default function RadioGroup(props: any): ReactElement {
	const { name, label, value, onChange, items } = props;
	
	return (
		<FormControl>
			<FormLabel>{label}</FormLabel>
			<MuiRadioGroup 
				row
				name={name}
				value={value}
				onChange={onChange}
			>
				{
					items.map(
						(item: any) => (
							<FormControlLabel 
								key={item.id}
								label={item.title}
								value={item.value}
								control={<Radio />}
							/>
						)
					)
				}
			</MuiRadioGroup>
		</FormControl>
	);
}