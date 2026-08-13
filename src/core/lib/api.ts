import ky from "ky";
import { config } from "@/config";

export type ApiSuccessResponse<T> = {
  status: "success";
  data: T;
};

export type ApiErrorResponse<ErrorKeys extends string[] = string[]> =
  | {
      status: "error";
      code:
        | "OPERATION_FAILED"
        | "INVALID_CREDENTIALS"
        | "ACCESS_DENIED"
        | "UNEXPECTED_ERROR"
        | "RATE_LIMIT_EXCEEDED"
        | "NOT_FOUND";
      error: string;
    }
  | {
      status: "error";
      code: "VALIDATION";
      errors: Record<ErrorKeys[number], string[]>;
    };

export const isApiError = (error: unknown): error is ApiErrorResponse => {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const err = error as ApiErrorResponse;

  return (
    err.status !== undefined &&
    err.status === "error" &&
    ("error" in err || ("errors" in err && Array.isArray(err.errors))) &&
    err.code !== undefined
  );
};

export const http = ky.create({
  baseUrl: config.apiUrl,
  prefix: config.apiPrefix,
  retry: {
    limit: 0,
  },
  credentials: "include",
});
