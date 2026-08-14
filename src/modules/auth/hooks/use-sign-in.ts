import type { ApiSuccessResponse } from "@/core/lib/api";
import { useAppForm } from "@/core/lib/tanstack-form";
import type { User } from "@/core/types/api/shared/user.type";
import type { MutationOptions } from "@/core/types/tanstack.types";
import { signIn } from "@/modules/auth/api/auth.api";
import { type SignInInput, signInSchema } from "@/modules/auth/schemas/sign-in.schema";
import { USERS_QUERY_KEYS } from "@/modules/users/const/users-query-keys.const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const useSignIn = (options?: MutationOptions<ApiSuccessResponse<User>, SignInInput>) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, ...rest } = useMutation({
    ...options,
    mutationFn: (data: SignInInput) => signIn(data),
    onSuccess: async (data, params, result, ctx) => {
      queryClient.setQueryData(USERS_QUERY_KEYS.getMe, data);
      options?.onSuccess?.(data, params, result, ctx);

      router.update({ context: { user: data.data } });
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
    } satisfies Omit<SignInInput, "redirectPath">,
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
      form.reset();
    },
    validators: {
      onChange: signInSchema,
    },
  });

  return {
    form,
    ...rest,
  };
};
