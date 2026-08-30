import type { CursorPaginatedResponse } from "@/core/lib/api";
import type { AdminUser } from "@/core/types/api/admin/admin-user.type";
import type { QueryOptions } from "@/core/types/tanstack.types";
import { getUsers } from "@/modules/admin/users/api/admin-users.api";
import { ADMIN_USER_QUERY_KEYS } from "@/modules/admin/users/const/admin-user-query-keys.const";
import type { GetUsersInput } from "@/modules/admin/users/schemas/get-users.schema";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (
  params?: GetUsersInput,
  options?: QueryOptions<CursorPaginatedResponse<AdminUser>>,
) =>
  useQuery({
    ...options,
    queryKey: ADMIN_USER_QUERY_KEYS.getUsers(params),
    queryFn: () => getUsers(params),
  });
