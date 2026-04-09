import { Router } from "express";
import * as todoHandlers from "./todoHandler.js";

const router = Router();

router.post("/", todoHandlers.createTodo);

export default router;
