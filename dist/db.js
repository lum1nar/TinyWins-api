import pg from "pg";
import "dotenv/config";
const { Pool } = pg;
// 解構，取出 pg object 中的 pool
// 使用 pool 不要使用 client，能夠同時處理多個請求
const pool = new Pool({
    connectionString: process.env.NODE_ENV == "production"
        ? process.env.PRO_DATABASE_URL
        : process.env.DEV_DATABASE_URL,
});
export default pool;
//# sourceMappingURL=db.js.map