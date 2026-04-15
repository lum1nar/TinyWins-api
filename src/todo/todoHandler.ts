import type { Request, Response } from "express";
import { HttpError } from "@/middleware/errorHandler.js";
import { createTodoSchema } from "./todoSchema.js";
import * as todoService from "./todoService.js";

export async function createTodo(req: Request, res: Response) {
	const data = createTodoSchema.parse(req.body);

	if (req.person === undefined) {
		return new HttpError(401, "Unauthorized");
	}

	const todo = await todoService.createTodo({
		...data,
		person_id: req.person.id,
	});
	res.status(200).json(todo);
}

export async function getTodos(req: Request, res: Response) {
	if (req.person === undefined) {
		return new HttpError(401, "Unauthorized");
	}

	const result = await todoService.getTodosByUserId(req.person.id);

	return res.status(200).json(result);
}

export async function deleteTodo(req: Request, res: Response) {
	if (req.person === undefined) {
		return new HttpError(401, "Unauthorized");
	}

	const { id } = req.params;
	const result = await todoService.deleteTodoById(req.person.id, Number(id));

	if (!result) {
		return new HttpError(404, "Todo not found");
	}

	return res.status(200).json(result);
}
