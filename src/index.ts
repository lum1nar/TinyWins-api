import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

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
	const user_id = req.person.id;

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
		const user_id = req.person.id;
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
		user: req.person,
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Backend running on PORT ${process.env.PORT}`);
});
