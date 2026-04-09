import type { NewTodo } from "@/db/types.js";
import * as userRepository from "./todoRepository.js";
import type { CreateTodoInput } from "./todoSchema.js";

export async function createTodo(
	data: CreateTodoInput & { person_id: number },
) {
	const newTodo: NewTodo = {
		...data,
	};

	return await userRepository.insertTodo(newTodo);
}
