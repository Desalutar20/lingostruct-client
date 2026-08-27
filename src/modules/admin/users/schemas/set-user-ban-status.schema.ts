import { z } from "zod";
import { userIdSchema } from "@/modules/admin/users/schemas/user-id.schema";

export const setUserBanStatusSchema = z
  .object({
    isBanned: z.boolean(),
  })
  .and(userIdSchema);

export type SetUserBanStatusInput = z.input<typeof setUserBanStatusSchema>;
