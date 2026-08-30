import z from "zod";

export const userIdSchema = z.object({
  id: z.uuid().trim().nonempty(),
});

export type UserIdInput = z.input<typeof userIdSchema>;
