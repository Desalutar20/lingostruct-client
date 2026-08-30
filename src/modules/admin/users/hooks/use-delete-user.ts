import type { ApiSuccessResponse, CursorPaginatedResponse } from "@/core/lib/api";
import type { AdminUser } from "@/core/types/api/admin/admin-user.type";
import type { MutationOptions } from "@/core/types/tanstack.types";
import { deleteUser } from "@/modules/admin/users/api/admin-users.api";
import { ADMIN_USER_QUERY_KEYS } from "@/modules/admin/users/const/admin-user-query-keys.const";
import { useUserFilters } from "@/modules/admin/users/context/user-filters.context";
import type { UserIdInput } from "@/modules/admin/users/schemas/user-id.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteUser = (
  options?: MutationOptions<ApiSuccessResponse<string>, UserIdInput>,
) => {
  const queryClient = useQueryClient();
  const { filters, setFilters } = useUserFilters();

  const queryKey = ADMIN_USER_QUERY_KEYS.getUsers(filters);

  return useMutation({
    ...options,
    mutationFn: (data: UserIdInput) => deleteUser(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey });

      const previousUsers = queryClient.getQueryData(queryKey);
      const previousFilters = { ...filters } as const;
      queryClient.setQueryData(queryKey, (old: CursorPaginatedResponse<AdminUser>) => {
        const newData = {
          ...old,
          data: old.data.filter((user) => user.id !== data.id),
        };

        if (newData.data.length === 0) {
          setFilters({ ...filters, prevCursor: undefined, nextCursor: undefined });
        }

        return newData;
      });

      return { previousUsers, previousFilters };
    },
    onSuccess: (data, params, result, ctx) => {
      toast.success(data.data);
      options?.onSuccess?.(data, params, result, ctx);
    },
    onError: (error, params, result, ctx) => {
      // setExternalErrors(error, r$)
      if (Object.keys(filters).length !== 0 && result !== undefined) {
        setFilters(result.previousFilters);
      }
      queryClient.setQueryData(queryKey, result?.previousUsers);
      options?.onError?.(error, params, result, ctx);
    },
  });
};
