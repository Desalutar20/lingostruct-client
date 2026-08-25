import { z } from "zod";
import {
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/modules/auth/const/auth-schemas.const";
import { emailSchema, nonEmptyStringSchema } from "@/modules/shared/schemas/common.schema";

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: nonEmptyStringSchema("Password can't be empty")
      .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
      .max(PASSWORD_MAX_LENGTH, `Password must be at most ${PASSWORD_MAX_LENGTH} characters`),
    firstName: nonEmptyStringSchema("First name can't be empty").max(
      FIRST_NAME_MAX_LENGTH,
      `First name must be at most ${FIRST_NAME_MAX_LENGTH} characters`,
    ),
    lastName: nonEmptyStringSchema("Last name can't be empty").max(
      LAST_NAME_MAX_LENGTH,
      `Last name must be at most ${LAST_NAME_MAX_LENGTH} characters`,
    ),
  })
  .strict();

export type SignUpInput = z.input<typeof signUpSchema>;
