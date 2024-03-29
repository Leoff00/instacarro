import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  email: z.string().email(),
});

export const loginSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type LoginBody = z.infer<typeof loginSchema>;
export type CreateUserBody = z.infer<typeof createUserSchema>;
