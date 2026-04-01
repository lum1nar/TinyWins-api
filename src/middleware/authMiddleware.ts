import type { AuthPayload } from "@/auth/types.js";
import { env } from "@/env.js";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.access_token;
  if (!token) return res.sendStatus(401);
  if (!env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  const payload = jwt.verify(token, env.JWT_SECRET);
  req.user = payload as AuthPayload;
  next();
};
