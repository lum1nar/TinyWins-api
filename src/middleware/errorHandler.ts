import type { NextFunction, Request, Response } from "express";
import { DatabaseError } from "pg";
import { PostgresError } from "pg-error-enum";
import * as z from "zod";
import { logger } from "@/utils/logger.js";

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
	_req: Request,
	res: Response,
	_next: NextFunction,
) {
	// logger.info("Hit Error Handler");
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

	const err = error instanceof Error ? error : new Error(JSON.stringify(error));

	if (error instanceof HttpError) {
		return res.status(error.status).json({ message: error.message });
	}

	logger.info(Object.getPrototypeOf(error));

	logger.error({ message: err.message, stack: err.stack }, "Unhandled error");

	return res.status(500).json({ message: "Internal Server Error" });
}
