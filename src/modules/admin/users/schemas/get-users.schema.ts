import { z } from "zod";
import { cursorPaginationSchema } from "@/modules/shared/schemas/cursor-pagination.schema";
import {
  GET_USERS_MAX_LIMIT,
  GET_USERS_SEARCH_MAX_LENGTH,
} from "@/modules/admin/users/const/admin-user-schemas.const";
import { nonEmptyStringSchema } from "@/modules/shared/schemas/common.schema";

export const getUsersSchema = cursorPaginationSchema(GET_USERS_MAX_LIMIT)
  .strict()
  .and(
    z.object({
      search: nonEmptyStringSchema().max(GET_USERS_SEARCH_MAX_LENGTH).optional(),
      isBanned: z.boolean().optional(),
      isVerified: z.boolean().optional(),
    }),
  );

export type GetUsersInput = z.input<typeof getUsersSchema>;
