import { z } from "zod";
import {
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
} from "@/modules/auth/const/auth-schemas.const.ts";
import { nonEmptyStringSchema } from "@/modules/shared/schemas/common.schema";

export const updateProfileSchema = z
  .object({
    firstName: nonEmptyStringSchema()
      .max(FIRST_NAME_MAX_LENGTH)
      .optional()
      .nullable()
      .transform((val) => (val?.length === 0 ? null : val)),
    lastName: nonEmptyStringSchema()
      .max(LAST_NAME_MAX_LENGTH)
      .optional()
      .nullable()
      .transform((val) => (val?.length === 0 ? null : val)),
    avatarUrl: z.url().trim().optional().nullable(),
  })
  .strict();

export type UpdateProfileInput = z.input<typeof updateProfileSchema>;
