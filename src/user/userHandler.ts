import type { Request, Response } from "express";
import * as userService from "./userService.js";

export async function getAllUsers(_req: Request, res: Response) {
  const users = await userService.getAllUsers();
  return res.status(200).json(users);
}
