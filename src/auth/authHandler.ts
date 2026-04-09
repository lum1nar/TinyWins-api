import { loginSchema, registerSchema } from "@/auth/authSchema.js";
import * as authService from "@/auth/authService.js";
import type { Request, Response } from "express";

export async function registerUser(req: Request, res: Response) {
  const data = registerSchema.parse(req.body);
  const user = await authService.registerUser(data);
  return res.json(user);
}

export async function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body);
  const token = await authService.login(data);

  res.cookie("access_token", token, {
    httpOnly: true,
    // JS 讀不到
    secure: true,
    // HTTPS 才傳 本地測試時 localhost 是不會被阻擋
    sameSite: "none",
    // 防 CSRF，lax 允許 GET 時傳送 credentials 但是 POST 不允許，因此對於 login 我們需要設為 none
  });

  return res.status(200).json({ message: "Login Successful" });
}
