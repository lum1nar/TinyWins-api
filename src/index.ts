import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./db.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import type { UserJwtPayload } from "./types/user.js";
// import { PrismaClient } from "./generated/prisma/client.ts";
//
// const prisma = new PrismaClient();
//

const app = express();
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://todo.lum1na.top"
        : "http://localhost:5173",
    credentials: true,
  }),
);
// Allow CORS for specific origin

app.use(express.json());
// need this to read req.body
app.use(cookieParser());
// need cookeParser to read cookie from request

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) return res.sendStatus(401);

  try {
    // This make sure JWT_SECRENT is a string rather than undefined
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not set");
    const payload = jwt.verify(token, process.env.JWT_SECRET) as UserJwtPayload;
    req.user = payload;
    next();
  } catch {
    return res.sendStatus(401);
  }
};

app.get("/todos", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
      user_id,
    ]);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "讀取資料失敗" });
  }
});
app.post("/todos", authMiddleware, async (req, res) => {
  const { title, notes } = req.body;
  const user_id = req.user.id;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "請輸入待辦事項！" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO todos (title, note, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, notes, user_id],
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "新增資料失敗" });
  }
});

app.delete("/todos/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.json({ message: "todo deleted", todo: result.rows[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "刪除資料失敗" });
  }
});

app.patch("/todos/:id/toggle", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
            UPDATE todos
            SET completed = NOT completed
            WHERE id = $1 
            RETURNING * 
            `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.json({ message: "todo patched", todo: result.rows[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "更新資料失敗" });
  }
});

app.post("/subtodos", authMiddleware, async (req, res) => {
  const { title, main_todo_id } = req.body;
  const user_id = req.user.id;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "請輸入待辦事項！" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO subtodos (title, main_todo_id, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, main_todo_id, user_id],
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "新增資料失敗" });
  }
});

app.get("/subtodos", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query(
      "SELECT * FROM subtodos WHERE user_id = $1",
      [user_id],
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "讀取資料失敗" });
  }
});

app.post("/logout", authMiddleware, async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true, // JS 讀不到
    secure: true, // HTTPS 才傳 本地測試時 localhost 是不會被阻擋
    sameSite: "none", // 防 CSRF，lax 允許 GET 時傳送 credentials 但是 POST 不允許，因此對於 login 我們需要設為 none
  });
  return res.status(200).json({ message: "已登出" });
});

app.get("/me", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "你已登入",
    user: req.user,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Backend running on PORT ${process.env.PORT}`);
});
