import { MutationCache, partialMatchKey, QueryCache, QueryClient } from "@tanstack/react-query";
import { isApiError, type ApiErrorResponse } from "@/core/lib/api.ts";
import { isHTTPError } from "ky";
import { QUERY_KEYS } from "@/core/const/query-keys.const";
import { toast } from "sonner";

const handleApiError = (error: unknown, disabled?: (err: ApiErrorResponse) => boolean) => {
  if (isHTTPError(error) && isApiError(error.data) && error.data.code !== "VALIDATION") {
    if (disabled?.(error.data)) return;

    return toast.error(error.data.error);
  }

  if (error instanceof Error) {
    return toast.error(error.message);
  }

  toast.error("Something went wrong");
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err, query) => {
      if (
        isHTTPError(err) &&
        isApiError(err.data) &&
        err.data.code === "INVALID_CREDENTIALS" &&
        partialMatchKey(query.queryKey, QUERY_KEYS.getProfile)
      )
        return;

      handleApiError(err);
    },
  }),
  mutationCache: new MutationCache({
    onError: (err) => handleApiError(err),
  }),
  defaultOptions: {
    queries: {
      //@ts-ignore
      placeholderData: (prev) => prev,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});
