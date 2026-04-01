import "dotenv/config";
import z from "zod";
import { logger } from "./utils/logger.js";

const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  JWT_SECRET: z.string().min(1),
  NODE_ENV: z.enum(["development", "production"]),

  POSTGRES_DB: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  DATABASE_URL: z.string().min(1),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  logger.error(z.treeifyError(result.error), "Invalid Environment Variables");
  process.exit(1);
}

export const env = result.data;
