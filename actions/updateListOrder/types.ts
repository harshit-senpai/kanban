import { z } from "zod";

import { List } from "@prisma/client";

import { UpdateListOrder } from "./schema";

import { ActionState } from "@/lib/createSafeAction";

export type InputType = z.infer<typeof UpdateListOrder>;
export type ReturnType = ActionState<InputType, List[]>;
