"use client";

import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/useAction";
import { Button } from "@/components/ui/button";

export default function Form() {
	const { execute, fieldErrors } = useAction(createBoard, {
		onSuccess: (data) => console.log(data, "SUCCESS"),
		onError: (error) => console.log(error),
	});

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string;

		execute({ title });
	};

	return (
		<form action={dispatch}>
			<div className="flex flex-col space-y-2">
				<FormInput errors={fieldErrors} />
			</div>

			<FormButton />
		</form>
	);
}
