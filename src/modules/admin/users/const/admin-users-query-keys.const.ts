import type { GetUsersInput } from "@/modules/admin/users/schemas/get-users.schema";

export const ADMIN_USERS_QUERY_KEYS = {
  getUsers: (input?: GetUsersInput) => ["getUsers", input] as const,
} as const;
