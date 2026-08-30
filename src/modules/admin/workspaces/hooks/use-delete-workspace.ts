import type { ApiSuccessResponse, CursorPaginatedResponse } from "@/core/lib/api";
import type { AdminWorkspace } from "@/core/types/api/admin/admin-workspace.type";
import type { MutationOptions } from "@/core/types/tanstack.types";
import { deleteWorkspace } from "@/modules/admin/workspaces/api/admin-workspaces.api";
import { ADMIN_WORKSPACE_QUERY_KEYS } from "@/modules/admin/workspaces/const/admin-workspace-query-keys.const";
import { useWorkspaceFilters } from "@/modules/admin/workspaces/context/workspace-filters.context";
import type { WorkspaceIdInput } from "@/modules/admin/workspaces/schemas/workspace-id.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteWorkspace = (
  options?: MutationOptions<ApiSuccessResponse<string>, WorkspaceIdInput>,
) => {
  const queryClient = useQueryClient();
  const { filters, setFilters } = useWorkspaceFilters();

  const queryKey = ADMIN_WORKSPACE_QUERY_KEYS.getWorkspaces(filters);

  return useMutation({
    ...options,
    mutationFn: (data: WorkspaceIdInput) => deleteWorkspace(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey });

      const previousWorkspaces = queryClient.getQueryData(queryKey);
      const previousFilters = { ...filters } as const;
      queryClient.setQueryData(queryKey, (old: CursorPaginatedResponse<AdminWorkspace>) => {
        const newData = {
          ...old,
          data: old.data.filter((workspace) => workspace.id !== data.id),
        };

        if (newData.data.length === 0) {
          setFilters({ ...filters, prevCursor: undefined, nextCursor: undefined });
        }

        return newData;
      });

      return { previousWorkspaces, previousFilters };
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
      queryClient.setQueryData(queryKey, result?.previousWorkspaces);
      options?.onError?.(error, params, result, ctx);
    },
  });
};
