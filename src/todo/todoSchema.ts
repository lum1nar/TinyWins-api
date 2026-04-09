import * as z from "zod";

export const createTodoSchema = z.object({
  title: z.string(),
  note: z.string(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
