import { db } from "@/db/database.js";
import type { CreateTodoInput } from "./todoSchema.js";
import type { NewTodo } from "@/db/types.js";

export async function insertTodo(data: NewTodo) {
  return await db
    .insertInto("todo")
    .values(data)
    .returningAll()
    .executeTakeFirstOrThrow();
}
