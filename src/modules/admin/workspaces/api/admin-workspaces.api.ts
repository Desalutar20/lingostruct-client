import { API_ENDPOINTS } from "@/core/const/api-endpoints.const";
import { toSearchParams } from "@/core/helpers/to-search-params";
import { http, type ApiSuccessResponse, type CursorPaginatedResponse } from "@/core/lib/api";
import type { AdminWorkspace } from "@/core/types/api/admin/admin-workspace.type";
import type { CreateWorkspaceInput } from "@/modules/admin/workspaces/schemas/create-workspace.schema";
import type { GetWorkspacesInput } from "@/modules/admin/workspaces/schemas/get-workspaces.schema";
import type { UpdateWorkspaceInput } from "@/modules/admin/workspaces/schemas/update-workspace.schema";
import type { WorkspaceIdInput } from "@/modules/admin/workspaces/schemas/workspace-id.schema";

export const createWorkspace = async (data: CreateWorkspaceInput) =>
  await http
    .post<ApiSuccessResponse<AdminWorkspace>>(API_ENDPOINTS.admin.workspaces.createWorkspace, {
      json: data,
    })
    .json();

export const getWorkspaces = async (params?: GetWorkspacesInput) =>
  await http
    .get<CursorPaginatedResponse<AdminWorkspace>>(API_ENDPOINTS.admin.workspaces.getWorkspaces, {
      searchParams: toSearchParams(params ?? {}),
    })
    .json();

export const updateWorkspace = async ({ id, ...rest }: UpdateWorkspaceInput) =>
  await http
    .patch<ApiSuccessResponse<AdminWorkspace>>(API_ENDPOINTS.admin.workspaces.updateWorkspace(id), {
      json: rest,
    })
    .json();

export const deleteWorkspace = async ({ id }: WorkspaceIdInput) =>
  await http
    .delete<ApiSuccessResponse<string>>(API_ENDPOINTS.admin.workspaces.deleteWorkspace(id))
    .json();
