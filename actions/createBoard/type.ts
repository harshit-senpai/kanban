// containing the types of out inputs and output

import { z } from "zod";
import { Board } from "@prisma/client";

import { ActionState } from "@/lib/createSafeAction";

import { CreateBoardSchema } from "./schema";

export type InputType = z.infer<typeof CreateBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;