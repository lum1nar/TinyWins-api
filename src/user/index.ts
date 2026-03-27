import { Router } from "express";
import * as handlers from "./userHandler.js";

const router = Router();

router.post("/", handlers.registerUser);

export default router;
