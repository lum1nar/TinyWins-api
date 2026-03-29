import { Router } from "express";
import * as userHandlers from "./userHandler.js";

const router = Router();

router.get("/", userHandlers.getUsers);

export default router;
