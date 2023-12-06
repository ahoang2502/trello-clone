"use client";

import { forwardRef, useRef, ElementRef, KeyboardEventHandler } from "react";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useOnClickOutside, useEventListener } from "usehooks-ts";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { FormTextarea } from "@/components/form/FormTextarea";
import FormSubmit from "@/components/form/FormSubmit";
import { useAction } from "@/hooks/useAction";
import { createCard } from "@/actions/create-card";

interface CardFormProps {
	listId: string;
	isEditing: boolean;
	enableEditing: () => void;
	disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
	({ listId, isEditing, enableEditing, disableEditing }, ref) => {
		const params = useParams();
		const formRef = useRef<ElementRef<"form">>(null);

		const { execute, fieldErrors } = useAction(createCard, {
			onSuccess: (data) => {
				toast.success(`Card "${data.title}" created`);
				formRef.current?.reset();
			},
			onError: (error) => toast.error(error),
		});

		const onKeydown = (e: KeyboardEvent) => {
			if (e.key === "Escape") disableEditing();
		};

		useOnClickOutside(formRef, disableEditing);
		useEventListener("keydown", onKeydown);

		const onTextareaKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (
			e
		) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				formRef.current?.requestSubmit();
			}
		};

		const onSubmit = (formData: FormData) => {
			const title = formData.get("title") as string;
			const listId = formData.get("listId") as string;
			const boardId = params.boardId as string;

			execute({
				title,
				listId,
				boardId,
			});
		};

		if (isEditing)
			return (
				<form
					ref={formRef}
					action={onSubmit}
					className="m-1 py-0.5 px-1 space-y-4 "
				>
					<FormTextarea
						id="title"
						onKeydown={onTextareaKeydown}
						ref={ref}
						errors={fieldErrors}
						placeholder="Enter a title for this card..."
					/>

					<input hidden id="listId" name="listId" value={listId} />
					<div className="flex items-center gap-x-1 ">
						<FormSubmit variant="primaryOrange">Add card</FormSubmit>
						<Button onClick={disableEditing} size="sm" variant="ghost">
							<X className="h-5 w-5 " />
						</Button>
					</div>
				</form>
			);

		return (
			<div className="pt-2 px-2">
				<Button
					className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
					size="sm"
					variant="ghost"
					onClick={enableEditing}
				>
					<Plus className="h-4 w-4 mr-2" />
					Add a card
				</Button>
			</div>
		);
	}
);

CardForm.displayName = "CardForm";
