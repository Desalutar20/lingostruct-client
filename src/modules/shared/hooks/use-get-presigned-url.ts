import type { ApiSuccessResponse } from "@/core/lib/api";
import type { QueryOptions } from "@/core/types/tanstack.types";
import { getPresignedUrl } from "@/modules/shared/api/shared.api";
import type { GetPresignedUrlInput } from "@/modules/shared/schemas/get-presigned-url.schema";
import { useQuery } from "@tanstack/react-query";

export const useGetPresignedUrl = (
  data: GetPresignedUrlInput,
  options?: QueryOptions<ApiSuccessResponse<string>>,
) =>
  useQuery({
    ...options,
    enabled: options?.enabled,
    queryKey: ["presigned-url", data],
    queryFn: () => getPresignedUrl(data),
  });
