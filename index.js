import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

const todos = [
    {
        id: 1,
        title: "收衣服",
        desc: "do this",
    },
    {
        id: 2,
        title: "打掃房間",
        desc: "do this",
    },
];

app.get("/", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
});

app.post("/todos", async (req, res) => {
    const { title, notes } = req.body;
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

app.listen(process.env.PORT, () => {
    console.log(`Backend running on PORT ${process.env.PORT}`);
});
