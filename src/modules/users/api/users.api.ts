import { API_ENDPOINTS } from "@/core/const/api-endpoints.const";
import { http, type ApiSuccessResponse } from "@/core/lib/api";
import type { User } from "@/core/types/api/shared/user.type";
import type { UpdateProfileInput } from "@/modules/users/schemas/update-profile.schema";

export const getMe = async () =>
  await http.get<ApiSuccessResponse<User>>(API_ENDPOINTS.users.me).json();

export const updateProfile = async (data: UpdateProfileInput) =>
  await http
    .patch<ApiSuccessResponse<string>>(API_ENDPOINTS.users.updateProfile, {
      json: {
        firstName: data.firstName?.length === 0 ? null : data.firstName,
        lastName: data.lastName?.length === 0 ? null : data.lastName,
        avatarUrl: data.avatarUrl,
      },
    })
    .json();
