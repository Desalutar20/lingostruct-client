import type { ApiSuccessResponse } from "@/core/lib/api";
import { useAppForm } from "@/core/lib/tanstack-form";
import type { MutationOptions } from "@/core/types/tanstack.types";
import { resetPassword } from "@/modules/auth/api/auth.api";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/modules/auth/schemas/reset-password.schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useResetPassword = (
  options?: MutationOptions<ApiSuccessResponse<string>, ResetPasswordInput>,
) => {
  const { mutateAsync, ...rest } = useMutation({
    ...options,
    mutationFn: ({ newPasswordConfirm: _, ...rest }: ResetPasswordInput) => resetPassword(rest),
    onSuccess: (data, params, result, ctx) => {
      toast.success(data.data);
      options?.onSuccess?.(data, params, result, ctx);
    },
    onError: (error, params, result, ctx) => {
      // setExternalErrors(error, r$)
      options?.onError?.(error, params, result, ctx);
    },
  });

  const form = useAppForm({
    defaultValues: {
      email: "",
      token: "",
      newPassword: "",
      newPasswordConfirm: "",
    } satisfies ResetPasswordInput,
    onSubmit: async ({ value }) => await mutateAsync(value),
    validators: {
      onChange: resetPasswordSchema,
    },
  });

  return {
    form,
    ...rest,
  };
};
