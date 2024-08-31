"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

import { createSafeAction } from "@/lib/createSafeAction";

import { UpdateList } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, id, boardId } = data;
  let list;

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });
    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Failed to create List",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);
