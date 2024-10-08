"use server";
import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { updateBoard } from "./schema";

import { createSafeAction } from "@/lib/createSafeAction";
import { createAuditLog } from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id } = data;
  let board;

  try {
    board = await db.board.update({
      where: {
        orgId,
        id,
      },
      data: {
        title,
      },
    });
    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Failed to update",
    };
  }

  revalidatePath(`/board/${id}`);

  return { data: board };
};

export const UpdateBoard = createSafeAction(updateBoard, handler);
