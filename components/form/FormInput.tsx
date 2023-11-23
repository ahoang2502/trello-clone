"use client";

interface FormInputProps {
	id: string;
	label?: string;
	type?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	errors?: Record<string, string[]> | undefined;
}

export default function FormInput() {
	return <div>FormInput</div>;
}
