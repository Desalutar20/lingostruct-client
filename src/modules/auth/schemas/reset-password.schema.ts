import { z } from "zod";
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/modules/auth/const/auth-schemas.const.ts";

export const resetPasswordSchema = z
  .object({
    email: z
      .email()
      .trim()
      .nonempty()
      .max(EMAIL_MAX_LENGTH, `Email must be at most ${EMAIL_MAX_LENGTH} characters`),
    token: z.string().trim().max(100, `token must be at most 100 characters`),
    newPassword: z
      .string()
      .trim()
      .nonempty()
      .min(PASSWORD_MIN_LENGTH, `New password must be at least ${PASSWORD_MIN_LENGTH} characters`)
      .max(PASSWORD_MAX_LENGTH, `New password must be at most ${PASSWORD_MAX_LENGTH} characters`),
    newPasswordConfirm: z.string().trim(),
  })
  .strict()
  .refine((obj) => obj.newPassword === obj.newPasswordConfirm, {
    path: ["newPasswordConfirm"],
    error: "Passwords do not match",
  });

export type ResetPasswordInput = z.input<typeof resetPasswordSchema>;
