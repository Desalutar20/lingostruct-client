import { type ApiSuccessResponse, http } from "@/core/lib/api.ts";
import type { SignUpInput } from "@/modules/auth/schemas/sign-up.schema.ts";
import type { User } from "@/core/types/api/shared/user.type";
import type { SignInInput } from "@/modules/auth/schemas/sign-in.schema";
import type { VerifyAccountInput } from "@/modules/auth/schemas/verify-account.schema";
import type { ForgotPasswordInput } from "@/modules/auth/schemas/forgot-password.schema";
import type { ResetPasswordInput } from "@/modules/auth/schemas/reset-password.schema";
import { API_ENDPOINTS } from "@/core/const/api-endpoints.const.ts";

export const signUp = async (data: SignUpInput) =>
  await http.post<ApiSuccessResponse<string>>(API_ENDPOINTS.auth.signUp, { json: data }).json();

export const signIn = async (data: SignInInput) =>
  await http.post<ApiSuccessResponse<User>>(API_ENDPOINTS.auth.signIn, { json: data }).json();

export const verifyAccount = async (data: VerifyAccountInput) =>
  await http
    .post<ApiSuccessResponse<string>>(API_ENDPOINTS.auth.verifyAccount, { json: data })
    .json();

export const forgotPassword = async (data: ForgotPasswordInput) =>
  await http
    .post<ApiSuccessResponse<string>>(API_ENDPOINTS.auth.forgotPassword, { json: data })
    .json();

export const resetPassword = async (data: Omit<ResetPasswordInput, "newPasswordConfirm">) =>
  await http
    .post<ApiSuccessResponse<string>>(API_ENDPOINTS.auth.resetPassword, { json: data })
    .json();

export const getProfile = async () =>
  await http.get<ApiSuccessResponse<User>>(API_ENDPOINTS.auth.getProfile).json();

export const logout = async () =>
  await http.post<ApiSuccessResponse<string>>(API_ENDPOINTS.auth.logout).json();
