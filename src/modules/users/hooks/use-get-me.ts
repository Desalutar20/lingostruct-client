import type { ApiSuccessResponse } from "@/core/lib/api";
import type { User } from "@/core/types/api/shared/user.type";
import type { QueryOptions } from "@/core/types/tanstack.types";
import { getMe } from "@/modules/users/api/users.api";
import { USER_QUERY_KEYS } from "@/modules/users/const/user-query-keys.const";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = (
  options?: Omit<QueryOptions<ApiSuccessResponse<User>>, "retry" | "retryOnMount">,
) => {
  return useQuery({
    ...options,
    queryKey: USER_QUERY_KEYS.getMe,
    queryFn: () => getMe(),
    select: (data) => data.data,
    retry: false,
    retryOnMount: false,
  });
};
