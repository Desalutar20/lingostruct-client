import z from "zod";

export const workspaceIdSchema = z.object({
  id: z.uuid().trim().nonempty(),
});

export type WorkspaceIdInput = z.input<typeof workspaceIdSchema>;
