import { z } from "zod";
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/modules/auth/const/auth-schemas.const.ts";

export const signInSchema = z.object({
  email: z
    .email()
    .trim()
    .nonempty()
    .max(EMAIL_MAX_LENGTH, `Email must be at most ${EMAIL_MAX_LENGTH} characters`),
  password: z
    .string()
    .trim()
    .nonempty()
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
    .max(PASSWORD_MAX_LENGTH, `Password must be at most ${PASSWORD_MAX_LENGTH} characters`),
});

export type SignInInput = z.infer<typeof signInSchema>;
