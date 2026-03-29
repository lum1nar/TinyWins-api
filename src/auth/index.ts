import { Router } from "express";
// import * as userHandlers from "./userHandler.js";
import * as authHandlers from "./authHandler.js";

const router = Router();

router.post("/login", authHandlers.login);
router.post("/register", authHandlers.registerUser);

export default router;
