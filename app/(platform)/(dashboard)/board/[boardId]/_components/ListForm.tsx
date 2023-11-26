"use client";

import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams, useRouter } from "next/navigation";

import ListWrapper from "./ListWrapper";
import { FormInput } from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { createList } from "@/actions/create-list";

export default function ListForm() {
	const [isEditing, setIsEditing] = useState(false);

	const formRef = useRef<ElementRef<"form">>(null);
	const inputRef = useRef<ElementRef<"input">>(null);

	const params = useParams();
	const router = useRouter();

	const enableEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			inputRef.current?.focus();
		});
	};
	const disableEditing = () => setIsEditing(false);

	const { execute, fieldErrors } = useAction(createList, {
		onSuccess: (data) => {
			toast.success(`List "${data.title}" created.`);
			disableEditing();
			router.refresh();
		},
		onError: (error) => [toast.error(error)],
	});

	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			disableEditing();
		}
	};

	useEventListener("keydown", onKeydown);
	useOnClickOutside(formRef, disableEditing);

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string;
		const boardId = formData.get("boardId") as string;

		execute({
			title,
			boardId,
		});
	};

	if (isEditing)
		return (
			<ListWrapper>
				<form
					className="w-full p-3 rounded-md bg-white space-y-4 shadow-md "
					ref={formRef}
					action={onSubmit}
				>
					<FormInput
						ref={inputRef}
						errors={fieldErrors}
						id="title"
						className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input transition "
						placeholder="Enter list title..."
					/>

					<input hidden value={params.boardId} name="boardId" />

					<div className="flex items-center gap-x-1 ">
						<FormSubmit variant="primaryCyan">Add list</FormSubmit>
						<Button size="sm" variant="ghost" onClick={disableEditing}>
							<X className="h-5 w-5 " />
						</Button>
					</div>
				</form>
			</ListWrapper>
		);

	return (
		<ListWrapper>
			<button
				className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
				onClick={enableEditing}
			>
				<Plus className="h-4 w-4 mr-2" />
				Add a list
			</button>
		</ListWrapper>
	);
}
