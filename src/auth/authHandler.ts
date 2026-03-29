import type { Person } from "@/db/types.js";
import { loginSchema, registerSchema } from "@/auth/authSchema.js";
import * as authService from "@/auth/authService.js";
import type { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { logger } from "@/utils/logger.js";
import * as userService from "@/user/userService.js";

export async function registerUser(req: Request, res: Response) {
  const data = registerSchema.parse(req.body);
  const user: Person = await authService.registerUser(data);
  return res.json(user);
}

export async function login(req: Request, res: Response) {
  try {
    const data = loginSchema.parse(req.body);
    const user = await userService.getUserByEmail(data.email);
    // throw "test";
    logger.info(user);
  } catch (err) {
    throw err;
  }
}

// app.post("/login", async (req, res) => {
//   console.log("Login route hit");
//   const { email, password } = req.body;
//   const result = await pool.query("SELECT * FROM users WHERE email = $1", [
//     email,
//   ]);
//
//   const user = result.rows[0];
//   if (!user) return res.status(401).json({ message: "帳號不存在" });
//
//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) return res.status(401).json({ message: "密碼錯誤" });
//
//   const payload = { id: user.id, username: user.username };
//
//   const token = jwt.sign(payload, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
//
//
//   // 解決方案：後來發現瀏覽器對於會自動把 localhost 的 https 驗證排除，所以按照下方設定就可以了...
//   res.cookie("access_token", token, {
//     httpOnly: true, // JS 讀不到
//     secure: true, // HTTPS 才傳 本地測試時 localhost 是不會被阻擋
//     sameSite: "none", // 防 CSRF，lax 允許 GET 時傳送 credentials 但是 POST 不允許，因此對於 login 我們需要設為 none
//   });
//   return res.json(payload);
// });
