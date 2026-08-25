import { z } from "zod";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/modules/auth/const/auth-schemas.const.ts";
import { emailSchema, nonEmptyStringSchema } from "@/modules/shared/schemas/common.schema";

export const resetPasswordSchema = z
  .object({
    email: emailSchema,
    token: z.string().trim().max(100, `token must be at most 100 characters`),
    newPassword: nonEmptyStringSchema("New password can't be empty")
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
