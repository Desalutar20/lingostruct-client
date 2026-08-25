import { API_ENDPOINTS } from "@/core/const/api-endpoints.const";
import { toSearchParams } from "@/core/helpers/to-search-params";
import { http, type CursorPaginatedResponse } from "@/core/lib/api";
import type { AdminUser } from "@/core/types/api/admin/admin-user.type";
import type { GetUsersInput } from "@/modules/admin/users/schemas/get-users.schema";

export const getUsers = async (params?: GetUsersInput) =>
  await http
    .get<CursorPaginatedResponse<AdminUser>>(API_ENDPOINTS.admin.users.getUsers, {
      searchParams: toSearchParams(params ?? {}),
    })
    .json();
