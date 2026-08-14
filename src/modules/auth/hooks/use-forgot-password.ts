import type { ApiSuccessResponse } from "@/core/lib/api";
import { useAppForm } from "@/core/lib/tanstack-form";
import type { MutationOptions } from "@/core/types/tanstack.types";
import { forgotPassword } from "@/modules/auth/api/auth.api";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/modules/auth/schemas/forgot-password.schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useForgotPassword = (
  options?: MutationOptions<ApiSuccessResponse<string>, ForgotPasswordInput>,
) => {
  const { mutateAsync, ...rest } = useMutation({
    ...options,
    mutationFn: (data: ForgotPasswordInput) => forgotPassword(data),
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
    } satisfies ForgotPasswordInput,
    onSubmit: async ({ value }) => await mutateAsync(value),
    validators: {
      onChange: forgotPasswordSchema,
    },
  });

  return {
    form,
    ...rest,
  };
};
