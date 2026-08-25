import { z } from "zod";
import { emailSchema } from "@/modules/shared/schemas/common.schema";

export const verifyAccountSchema = z
  .object({
    email: emailSchema,
    token: z.string().trim().nonempty().max(200, `token must be at most 100 characters`),
  })
  .strict();

export type VerifyAccountInput = z.input<typeof verifyAccountSchema>;
