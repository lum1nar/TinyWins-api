import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import "dotenv/config";
import type { Database } from "./types.js";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
