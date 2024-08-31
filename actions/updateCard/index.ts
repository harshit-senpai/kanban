"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { UpdateCard } from "./schema";

import { createSafeAction } from "@/lib/createSafeAction";
import { createAuditLog } from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId, ...values } = data;
  let card;

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    });
    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Failed to Update",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
