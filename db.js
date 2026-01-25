import pg from "pg";
import "dotenv/config";
const { Pool } = pg;

// 解構，取出 pg object 中的 pool
// 使用 pool 不要使用 client，能夠同時處理多個請求

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default pool;
