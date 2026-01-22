import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
});

app.post("/todos", async (req, res) => {
    const { title, notes } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ error: "請輸入待辦事項！" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO todos (title, note) VALUES ($1, $2) RETURNING *",
            [title, notes],
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "新增資料失敗" });
    }
});

app.get("/todos", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM todos");
        res.status(201).json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "讀取資料失敗" });
    }
});

app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM todos WHERE id = $1 RETURNING *",
            [id],
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "todo deleted", todo: result.rows[0] });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "刪除資料失敗" });
    }
});

app.patch("/todos/:id/toggle", async (req, res) => {
    const { id } = req.params;
    try {
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

        res.json({ message: "todo patched", todo: result.rows[0] });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "更新資料失敗" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Backend running on PORT ${process.env.PORT}`);
});
