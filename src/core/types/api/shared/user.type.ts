import type { Nullable } from "@/core/types/common.types";

export type UserRole = "admin" | "regular";

export type User = {
  id: string;
  email: string;
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  role: UserRole;
  avatarUrl: Nullable<string>;
};
