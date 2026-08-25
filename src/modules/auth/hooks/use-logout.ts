import { ROUTES } from "@/core/const/routes.const";
import type { ApiSuccessResponse } from "@/core/lib/api";
import type { MutationOptions } from "@/core/types/tanstack.types";
import { logout } from "@/modules/auth/api/auth.api";
import type { VerifyAccountInput } from "@/modules/auth/schemas/verify-account.schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const useLogout = (options?: MutationOptions<ApiSuccessResponse<string>>) => {
  const router = useRouter();

  return useMutation({
    ...options,
    mutationFn: () => logout(),
    onSuccess: async (data, params, result, ctx) => {
      options?.onSuccess?.(data, params, result, ctx);
      router.update({ context: { user: null } });
      await router.navigate({ to: ROUTES.auth.signIn.href });
    },
    onError: (error, params, result, ctx) => {
      // setExternalErrors(error, r$)
      options?.onError?.(error, params, result, ctx);
    },
  });
};
