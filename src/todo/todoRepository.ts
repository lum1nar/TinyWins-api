import { db } from "@/db/database.js";
import type { NewTodo } from "@/db/types.js";

export async function insertTodo(data: NewTodo) {
	return await db
		.insertInto("todo")
		.values(data)
		.returningAll()
		.executeTakeFirstOrThrow();
}

export async function getTodosByUserId(userId: number) {
	return await db
		.selectFrom("todo")
		.selectAll()
		.where("person_id", "=", userId)
		.execute();
}

export async function deleteTodoById(userId: number, id: number) {
	return await db
		.deleteFrom("todo")
		.where("id", "=", id)
		.where("person_id", "=", userId)
		.returningAll()
		.executeTakeFirst();
}
