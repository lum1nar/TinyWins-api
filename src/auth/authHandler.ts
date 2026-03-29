import type { Person } from "@/db/types.js";
import { loginSchema, registerSchema } from "@/auth/authSchema.js";
import * as authService from "@/auth/authService.js";
import type { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { logger } from "@/utils/logger.js";
import * as userService from "@/user/userService.js";

export async function registerUser(req: Request, res: Response) {
  const data = registerSchema.parse(req.body);
  const user = await authService.registerUser(data);
  return res.json(user);
}

export async function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body);
  const va = await authService.login(data);
  // logger.info(user);
}
