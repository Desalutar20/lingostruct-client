import { z } from "zod";
import { cursorPaginationSchema } from "@/modules/shared/schemas/cursor-pagination.schema";
import { nonEmptyStringSchema } from "@/modules/shared/schemas/common.schema";
import {
  GET_WORKSPACES_MAX_LIMIT,
  GET_WORKSPACES_SEARCH_MAX_LENGTH,
} from "@/modules/admin/workspaces/const/admin-workspace-schemas.const";

export const getWorkspacesSchema = cursorPaginationSchema(GET_WORKSPACES_MAX_LIMIT)
  .strict()
  .and(
    z.object({
      search: nonEmptyStringSchema().max(GET_WORKSPACES_SEARCH_MAX_LENGTH).optional(),
    }),
  );

export type GetWorkspacesInput = z.input<typeof getWorkspacesSchema>;
