import { z } from "zod";

import { createWorkspaceSchema } from "@/modules/admin/workspaces/schemas/create-workspace.schema";
import { workspaceIdSchema } from "@/modules/admin/workspaces/schemas/workspace-id.schema";

export const updateWorkspaceSchema = createWorkspaceSchema.partial().and(workspaceIdSchema);

export type UpdateWorkspaceInput = z.input<typeof updateWorkspaceSchema>;
