import type { GetWorkspacesInput } from "@/modules/admin/workspaces/schemas/get-workspaces.schema";

export const ADMIN_WORKSPACE_QUERY_KEYS = {
  getWorkspaces: (input?: GetWorkspacesInput) =>
    [...ADMIN_WORKSPACE_QUERY_KEYS.getWorkspacesRoot(), input] as const,
  getWorkspacesRoot: () => ["getWorkspaces"] as const,
} as const;
