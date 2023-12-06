"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpdateListOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();
	if (!userId || !orgId) return { error: "Unauthorized." };

	const { items, boardId } = data;

	let lists;
	try {
		const transaction = items.map((listItem) =>
			db.list.update({
				where: {
					id: listItem.id,
					board: { orgId },
				},
				data: {
					order: listItem.order,
				},
			})
		);

		lists = await db.$transaction(transaction);
	} catch (error) {
		return { error: "Failed to reorder." };
	}

	revalidatePath(`/board/${boardId}`);
	return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
