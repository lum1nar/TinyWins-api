import type { Request, Response } from "express";
import { createTodoSchema } from "./todoSchema.js";
import * as todoService from "./todoService.js";

export async function createTodo(req: Request, res: Response) {
  const data = createTodoSchema.parse(req.body);
  const todo = await todoService.createTodo({
    ...data,
    person_id: req.person!.id,
  });
  res.status(200).json(todo);
}
