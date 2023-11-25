"use client";

import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverTrigger,
	PopoverClose,
	PopoverContent,
} from "@/components/ui/popover";
import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/useAction";

interface BoardOptions {
	id: string;
}

export default function BoardOptions({ id }: BoardOptions) {
	const { execute, isLoading } = useAction(deleteBoard, {
		onError: (error) => {
			toast.error(error);
		},
	});

	const onDelete = () => {
		execute({ id });
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="h-auto w-auto p-2" variant="transparent">
					<MoreHorizontal className="h-4 w-4 " />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="px-0 py-3 " side="bottom" align="start">
				<div className="text-sm font-medium text-center text-neutral-600 pb-4">
					Board action
				</div>
				<PopoverClose asChild>
					<Button
						className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
						variant="ghost"
					>
						<X className="h-4 w-4 " />
					</Button>
				</PopoverClose>

				<Button
					variant="ghost"
					onClick={onDelete}
					disabled={isLoading}
					className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm text-rose-500"
				>
					Delete this board
				</Button>
			</PopoverContent>
		</Popover>
	);
}
