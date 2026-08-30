import { areEqualByKeys } from "@/core/helpers/are-equal-by-keys";
import type { ApiSuccessResponse } from "@/core/lib/api";
import { useAppForm } from "@/core/lib/tanstack-form";
import type { AdminWorkspace } from "@/core/types/api/admin/admin-workspace.type";
import type { MutationOptions } from "@/core/types/tanstack.types";
import {
  createWorkspace,
  updateWorkspace,
} from "@/modules/admin/workspaces/api/admin-workspaces.api";
import { ADMIN_WORKSPACE_QUERY_KEYS } from "@/modules/admin/workspaces/const/admin-workspace-query-keys.const";
import {
  createWorkspaceSchema,
  type CreateWorkspaceInput,
} from "@/modules/admin/workspaces/schemas/create-workspace.schema";
import {
  updateWorkspaceSchema,
  type UpdateWorkspaceInput,
} from "@/modules/admin/workspaces/schemas/update-workspace.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export const useCreateUpdateWorkspace = (
  workspace?: AdminWorkspace,
  options?: {
    createOptions?: MutationOptions<ApiSuccessResponse<AdminWorkspace>, CreateWorkspaceInput>;
    updateOptions?: MutationOptions<ApiSuccessResponse<AdminWorkspace>, UpdateWorkspaceInput>;
  },
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: createMutateAsync, ...createRest } = useMutation({
    ...options?.createOptions,
    mutationFn: (data: CreateWorkspaceInput) => createWorkspace(data),
    onSuccess: (data, params, result, ctx) => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_WORKSPACE_QUERY_KEYS.getWorkspacesRoot(),
      });

      toast.success("Success");
      options?.createOptions?.onSuccess?.(data, params, result, ctx);
    },
    onError: (error, params, result, ctx) => {
      // setExternalErrors(error, r$)
      options?.createOptions?.onError?.(error, params, result, ctx);
    },
  });

  const { mutateAsync: updateMutateAsync, ...updateRest } = useMutation({
    ...options?.updateOptions,
    mutationFn: (data: UpdateWorkspaceInput) => updateWorkspace(data),
    onSuccess: (data, params, result, ctx) => {
      queryClient.removeQueries({
        queryKey: ADMIN_WORKSPACE_QUERY_KEYS.getWorkspacesRoot(),
      });

      router.navigate({ to: ".", state: { workspace: data.data } });
      toast.success("Success");
      options?.updateOptions?.onSuccess?.(data, params, result, ctx);
    },
    onError: (error, params, result, ctx) => {
      // setExternalErrors(error, r$)
      options?.updateOptions?.onError?.(error, params, result, ctx);
    },
  });

  const form = useAppForm({
    defaultValues: {
      ...(workspace !== undefined ? { id: workspace.id } : {}),
      name: workspace?.name ?? "",
      country: workspace?.country ?? "",
      city: workspace?.city ?? "",
      street: workspace?.street ?? "",
      streetNumber: workspace?.streetNumber ?? "",
      postalCode: workspace?.postalCode ?? "",
    },
    onSubmit: async ({ value }) => {
      if (workspace === undefined) {
        await createMutateAsync(value);
        return form.reset();
      }

      if (
        areEqualByKeys(value, workspace, [
          "name",
          "country",
          "city",
          "street",
          "streetNumber",
          "postalCode",
        ])
      )
        return;

      await updateMutateAsync({
        id: workspace.id,
        name: value.name || undefined,
        country: value.country || undefined,
        city: value.city || undefined,
        street: value.street || undefined,
        streetNumber: value.streetNumber || undefined,
        postalCode: value.postalCode || undefined,
      });
    },
    validators: {
      //@ts-ignore
      onChange: workspace === undefined ? createWorkspaceSchema : updateWorkspaceSchema,
    },
  });

  return {
    form,
    ...(workspace === undefined ? createRest : updateRest),
  };
};
