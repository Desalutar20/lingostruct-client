import type { CursorPaginatedResponse } from "@/core/lib/api";
import type { QueryOptions } from "@/core/types/tanstack.types";
import { ADMIN_WORKSPACE_QUERY_KEYS } from "@/modules/admin/workspaces/const/admin-workspace-query-keys.const";
import type { GetWorkspacesInput } from "@/modules/admin/workspaces/schemas/get-workspaces.schema";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "../api/admin-workspaces.api";
import type { AdminWorkspace } from "@/core/types/api/admin/admin-workspace.type";

export const useGetWorkspaces = (
  params?: GetWorkspacesInput,
  options?: QueryOptions<CursorPaginatedResponse<AdminWorkspace>>,
) =>
  useQuery({
    ...options,
    queryKey: ADMIN_WORKSPACE_QUERY_KEYS.getWorkspaces(params),
    queryFn: () => getWorkspaces(params),
  });
