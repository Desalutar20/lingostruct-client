import { createRoute } from "@tanstack/react-router";
import { ROUTES } from "@/core/const/routes.const";
import { getWorkspacesSchema } from "@/modules/admin/workspaces/schemas/get-workspaces.schema";

import { WorkspaceFiltersProvider } from "@/modules/admin/workspaces/context/workspace-filters.context";
import { AdminWorkspacePage } from "@/modules/admin/workspaces/pages/admin-workspace/admin-workspace.page";
import { AdminWorkspacesPage } from "@/modules/admin/workspaces/pages/admin-workspaces/admin-workspaces.page";
import { adminLayout } from "@/modules/admin/admin.routes";

export const getAdminWorkspacesRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: ROUTES.admin.workspaces.root.path,
  component: () => (
    <WorkspaceFiltersProvider>
      <AdminWorkspacesPage />
    </WorkspaceFiltersProvider>
  ),
  validateSearch: getWorkspacesSchema,
});

export const getAdminWorkspaceRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: ROUTES.admin.workspaces.specificWorkspace.path,
  component: () => <AdminWorkspacePage />,
});
