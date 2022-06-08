import { useState } from "react";

export function useForm(
	initialValue: any, 
	validateOnChange = false, 
	validate: (arg0: object) => void) 
{
	const [values, setValues] = useState(initialValue);
	const [errors, setErrors] = useState(initialValue);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value,
		});

		if (validateOnChange) {
			validate({ [name]: value });
		}
	};

	const resetForm = () => {
		setValues(initialValue);
		setErrors({});
	};

	return {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
		resetForm,
	};
}
