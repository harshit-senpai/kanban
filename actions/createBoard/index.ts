"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { CreateBoardSchema } from "./schema";
import { createAuditLog } from "@/lib/createAuditLog";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  console.log(imageId);

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "Missing Fields, Failed to create Board.",
    };
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
      },
    });

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoardSchema, handler);
// this creteBoard is a going to return a promise which after resolving gives the title of the board
