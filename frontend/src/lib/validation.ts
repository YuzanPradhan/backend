import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(5).max(50),
  password: z.string().min(8),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email().min(5).max(50),
});
