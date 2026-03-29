import type { Request, Response } from "express";
import * as userService from "./userService.js";

export async function getUsers(_req: Request, res: Response) {
  const users = await userService.getUsers();
  return res.status(200).json(users);
}
