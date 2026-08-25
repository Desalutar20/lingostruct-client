import { API_ENDPOINTS } from "@/core/const/api-endpoints.const";
import { http, type ApiSuccessResponse } from "@/core/lib/api";
import type { GetPresignedUrlInput } from "@/modules/shared/schemas/get-presigned-url.schema";

export const getPresignedUrl = async (data: GetPresignedUrlInput) =>
  await http
    .get<ApiSuccessResponse<{ uploadUrl: string; publicUrl: string }>>(
      API_ENDPOINTS.files.getPresignedUrl,
      {
        searchParams: data as Record<string, string>,
      },
    )
    .json();
