import { API_ENDPOINTS } from "@/core/const/api-endpoints.const";
import { http, type ApiSuccessResponse } from "@/core/lib/api";
import type { User } from "@/core/types/api/shared/user.type";

export const getMe = async () =>
  await http.get<ApiSuccessResponse<User>>(API_ENDPOINTS.users.me).json();
