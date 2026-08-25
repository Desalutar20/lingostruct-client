import type { Nullable } from "@/core/types/common.types";

export type AdminUser = {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  role: string;
  isBanned: boolean;
  isVerified: boolean;
  avatarUrl: Nullable<string>;
  googleId: Nullable<string>;
  githubId: Nullable<string>;
};
