import { API_ENDPOINTS } from "@/core/const/api-endpoints.const";
import { toSearchParams } from "@/core/helpers/to-search-params";
import { http, type ApiSuccessResponse, type CursorPaginatedResponse } from "@/core/lib/api";
import type { AdminUser } from "@/core/types/api/admin/admin-user.type";
import type { GetUsersInput } from "@/modules/admin/users/schemas/get-users.schema";
import type { SetUserBanStatusInput } from "@/modules/admin/users/schemas/set-user-ban-status.schema";
import type { UserIdInput } from "@/modules/admin/users/schemas/user-id.schema";

export const getUsers = async (params?: GetUsersInput) =>
  await http
    .get<CursorPaginatedResponse<AdminUser>>(API_ENDPOINTS.admin.users.getUsers, {
      searchParams: toSearchParams(params ?? {}),
    })
    .json();

export const setUserBanStatus = async ({ id, ...data }: SetUserBanStatusInput) =>
  await http
    .patch<ApiSuccessResponse<string>>(API_ENDPOINTS.admin.users.setUserBanStatus(id), {
      json: data,
    })
    .json();

export const deleteUser = async ({ id }: UserIdInput) =>
  await http.delete<ApiSuccessResponse<string>>(API_ENDPOINTS.admin.users.deleteUser(id)).json();
