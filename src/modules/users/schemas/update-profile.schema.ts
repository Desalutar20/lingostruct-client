import { z } from "zod";
import {
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
} from "@/modules/auth/const/auth-schemas.const.ts";

export const updateProfileSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .max(FIRST_NAME_MAX_LENGTH)
      .optional()
      .nullable()
      .transform((val) => (val?.length === 0 ? null : val)),
    lastName: z
      .string()
      .trim()
      .max(LAST_NAME_MAX_LENGTH)
      .optional()
      .nullable()
      .transform((val) => (val?.length === 0 ? null : val)),
    avatarId: z.string().trim().optional().nullable(),
  })
  .strict();

export type UpdateProfileInput = z.input<typeof updateProfileSchema>;
