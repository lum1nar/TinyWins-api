import { Router } from "express";
import * as todoHandlers from "./todoHandler.js";

const router = Router();

router.post("/", todoHandlers.createTodo);
router.get("/", todoHandlers.getTodos);
router.delete("/:id", todoHandlers.deleteTodo);

export default router;
