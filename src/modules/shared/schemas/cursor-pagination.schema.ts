import { nonEmptyStringSchema } from "@/modules/shared/schemas/common.schema";
import z from "zod";

export const cursorPaginationSchema = (max: number) =>
  z
    .object({
      prevCursor: nonEmptyStringSchema().optional(),
      nextCursor: nonEmptyStringSchema().optional(),
      limit: z.coerce.number().positive().max(max).optional(),
    })
    .refine(({ prevCursor, nextCursor }) => prevCursor === undefined || nextCursor === undefined, {
      message: "prevCursor and nextCursor cannot be provided together",
      path: ["cursor"],
    });
