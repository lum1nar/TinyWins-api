import { Router } from "express";
import { createPerson } from "./user-query.js";

const router = Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const newPerson = await createPerson({
    username: "lum1nar",
    email: "test",
    password_hash: "test",
  });
  res.json(newPerson);
});

export default router;
