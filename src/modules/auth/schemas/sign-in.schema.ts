import { z } from "zod";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/modules/auth/const/auth-schemas.const.ts";
import { emailSchema, nonEmptyStringSchema } from "@/modules/shared/schemas/common.schema";

export const signInSchema = z
  .object({
    email: emailSchema,
    password: nonEmptyStringSchema("Password can't be empty")
      .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
      .max(PASSWORD_MAX_LENGTH, `Password must be at most ${PASSWORD_MAX_LENGTH} characters`),
  })
  .strict();

export type SignInInput = z.input<typeof signInSchema>;
