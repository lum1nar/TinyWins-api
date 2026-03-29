import { logger } from "@/utils/logger.js";
import type { NextFunction, Request, Response } from "express";
import { DatabaseError } from "pg";
import { PostgresError } from "pg-error-enum";
import * as z from "zod";

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}
export function errorHanlder(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.info("Hit Error Handler");
  if (error instanceof DatabaseError) {
    logger.error(
      {
        code: error.code,
        detail: error.detail,
        table: error.table,
        constraint: error.constraint,
      },
      "Database Error Occurred",
    );
    switch (error.code) {
      case PostgresError.UNIQUE_VIOLATION:
        return res.status(409).json({ message: "Email already exists" });
    }
  }

  if (error instanceof z.ZodError) {
    // 不需要後端 log，使用者打錯格式很正常
    return res.status(400).json({ message: z.treeifyError(error) });
  }

  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.status });
  }

  logger.info(Object.getPrototypeOf(error));

  logger.error({ error }, "Unhandled error");
  return res.status(500).json({ message: "Internal Server Error" });
}
