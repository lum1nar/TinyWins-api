import { Router } from "express";
import * as personHandlers from "./userHandler.js";

const router = Router();

router.get("/", personHandlers.getAllUsers);

export default router;
