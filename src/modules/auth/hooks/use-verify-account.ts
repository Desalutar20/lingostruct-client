import type { ApiSuccessResponse } from "@/core/lib/api";
import type { MutationOptions } from "@/core/types/tanstack.types";
import { verifyAccount } from "@/modules/auth/api/auth.api";
import type { VerifyAccountInput } from "@/modules/auth/schemas/verify-account.schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useVerifyAccount = (
  options?: MutationOptions<ApiSuccessResponse<string>, VerifyAccountInput>,
) =>
  useMutation({
    ...options,
    mutationFn: (data: VerifyAccountInput) => verifyAccount(data),
    onSuccess: (data, params, result, ctx) => {
      toast.success(data.data);

      options?.onSuccess?.(data, params, result, ctx);
    },
    onError: (error, params, result, ctx) => {
      // setExternalErrors(error, r$)
      options?.onError?.(error, params, result, ctx);
    },
  });
