import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => res.send("TEST 1234"));

export default router;
