"use client";

import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/FormInput";
import { updateBoard } from "@/actions/update-board";
import { useAction } from "@/hooks/useAction";
import { toast } from "sonner";

interface BoardTitleFormProps {
	data: Board;
}

export default function BoardTitleForm({ data }: BoardTitleFormProps) {
	const formRef = useRef<ElementRef<"form">>(null);
	const inputRef = useRef<ElementRef<"input">>(null);

	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(data.title);

	const { execute } = useAction(updateBoard, {
		onSuccess: (data) => {
			toast.success(`Board "${data.title}" updated.`);
			setTitle(title);
			disableEditing();
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	const disableEditing = () => setIsEditing(false);
	const enableEditing = () => {
		// Focus inputs
		setIsEditing(true);
		setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.select();
		});
	};

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string;

		execute({
			title,
			id: data.id,
		});
	};
	const onBlur = () => {
		formRef.current?.requestSubmit();
	};

	if (isEditing)
		return (
			<form
				ref={formRef}
				action={onSubmit}
				className="flex items-center gap-x-2"
			>
				<FormInput
					ref={inputRef}
					id="title"
					onBlur={onBlur}
					defaultValue={title}
					className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent border-none"
				/>
			</form>
		);

	return (
		<Button
			variant="transparent"
			className="font-bold text-lg h-auto w-auto p-1 px-2"
			onClick={enableEditing}
		>
			{title}
		</Button>
	);
}
