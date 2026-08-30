import { z } from "zod";

import { nonEmptyStringSchema } from "@/modules/shared/schemas/common.schema";
import {
  WORKSPACE_NAME_MAX_LENGTH,
  WORKSPACE_COUNTRY_MAX_LENGTH,
  WORKSPACE_CITY_MAX_LENGTH,
  WORKSPACE_STREET_MAX_LENGTH,
  WORKSPACE_STREET_NUMBER_MAX_LENGTH,
  WORKSPACE_POSTAL_CODE_MAX_LENGTH,
} from "@/modules/admin/workspaces/const/admin-workspace-schemas.const";

export const createWorkspaceSchema = z
  .object({
    name: nonEmptyStringSchema("Workspace name can't be empty").max(
      WORKSPACE_NAME_MAX_LENGTH,
      `Workspace name must be at most ${WORKSPACE_NAME_MAX_LENGTH} characters`,
    ),
    country: nonEmptyStringSchema("Workspace country can't be empty").max(
      WORKSPACE_COUNTRY_MAX_LENGTH,
      `Workspace country must be at most ${WORKSPACE_COUNTRY_MAX_LENGTH} characters`,
    ),
    city: nonEmptyStringSchema("Workspace city can't be empty").max(
      WORKSPACE_CITY_MAX_LENGTH,
      `Workspace city must be at most ${WORKSPACE_CITY_MAX_LENGTH} characters`,
    ),
    street: nonEmptyStringSchema("Workspace street can't be empty").max(
      WORKSPACE_STREET_MAX_LENGTH,
      `Workspace street must be at most ${WORKSPACE_STREET_MAX_LENGTH} characters`,
    ),
    streetNumber: nonEmptyStringSchema("Workspace street number can't be empty").max(
      WORKSPACE_STREET_NUMBER_MAX_LENGTH,
      `Workspace street number must be at most ${WORKSPACE_STREET_NUMBER_MAX_LENGTH} characters`,
    ),
    postalCode: nonEmptyStringSchema("Workspace postalCode can't be empty").max(
      WORKSPACE_POSTAL_CODE_MAX_LENGTH,
      `Workspace postalCode must be at most ${WORKSPACE_POSTAL_CODE_MAX_LENGTH} characters`,
    ),
  })
  .strict();

export type CreateWorkspaceInput = z.input<typeof createWorkspaceSchema>;
