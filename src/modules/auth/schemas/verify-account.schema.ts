import { z } from "zod";
import { EMAIL_MAX_LENGTH } from "@/modules/auth/const/auth-schemas.const.ts";

export const verifyAccountSchema = z.object({
  email: z
    .email()
    .trim()
    .nonempty()
    .max(EMAIL_MAX_LENGTH, `Email must be at most ${EMAIL_MAX_LENGTH} characters`),
  token: z.string().trim().nonempty().max(200, `token must be at most 100 characters`),
});

export type VerifyAccountInput = z.infer<typeof verifyAccountSchema>;
