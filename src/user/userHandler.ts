import type { Request, Response } from "express";
import * as userService from "./userService.js";
import * as z from "zod";
import { registerSchema } from "./userSchema.js";

export async function registerUser(req: Request, res: Response) {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: z.treeifyError(result.error) });
  }

  userService.registerUser(result.data);
  console.log(result);
  res.status(201).send();

  // const newPerson = await createPerson({
  //   username: "lum1nar",
  //   email: "test",
  //   password_hash: "test",
  // });
  // res.json(newPerson);
  // const user = await userService.registerUser(person);
}
