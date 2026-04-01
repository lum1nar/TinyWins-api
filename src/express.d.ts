import type { AuthPayload } from "./auth/types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
