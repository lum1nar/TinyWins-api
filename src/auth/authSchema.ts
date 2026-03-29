import * as z from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type registerInput = z.infer<typeof registerSchema>;
export type loginInput = z.infer<typeof registerSchema>;
