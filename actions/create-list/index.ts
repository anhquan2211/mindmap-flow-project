"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";

const log = () => console.log(1);

const handler = async (data: InputType): Promise<ReturnType> => {
  log();
  const { userId, orgId } = auth();
  // console.log(1234);

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { data_map, boardId } = data;
  let list;
  // console.log("dataMap: ", data_map);

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!board) {
      return {
        error: "Mindmap not found!",
      };
    }

    list = await db.list.create({
      data: {
        order: 1,
        data_map: JSON.stringify(data_map),
        boardId,
      },
    });
    // console.log("list", list);
  } catch (error) {
    // console.log("error: ", error);

    return {
      error: "Failed to create.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
