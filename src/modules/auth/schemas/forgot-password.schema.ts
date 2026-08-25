import { z } from "zod";
import { emailSchema } from "@/modules/shared/schemas/common.schema";

export const forgotPasswordSchema = z
  .object({
    email: emailSchema,
  })
  .strict();

export type ForgotPasswordInput = z.input<typeof forgotPasswordSchema>;
