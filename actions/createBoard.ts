"use server";

import { z } from "zod";

import { db } from "@/lib/db";

const CreateBoardSchema = z.object({
  title: z.string(),
});

export async function createBoard(formData: FormData) {
  const { title } = CreateBoardSchema.parse({
    title: formData.get("title"),
  });

  await db.board.create({
    data: {
      title,
    },
  });
}
