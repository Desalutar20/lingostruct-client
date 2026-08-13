import type { ApiSuccessResponse } from "@/core/lib/api";
import { useAppForm } from "@/core/lib/tanstack-form";
import type { MutationOptions } from "@/core/types/tanstack.types";
import { signUp } from "@/modules/auth/api/auth.api";
import { signUpSchema, type SignUpInput } from "@/modules/auth/schemas/sign-up.schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type z from "zod";

export const useSignUp = (options?: MutationOptions<ApiSuccessResponse<string>, SignUpInput>) => {
  const { mutateAsync, ...rest } = useMutation({
    ...options,
    mutationFn: (data: SignUpInput) => signUp(data),
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
      password: "",
      firstName: "",
      lastName: "",
    } satisfies z.input<typeof signUpSchema>,
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
      form.reset();
    },
    validators: {
      onChange: signUpSchema,
    },
  });

  return {
    form,
    ...rest,
  };
};
