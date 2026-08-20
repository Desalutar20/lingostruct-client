import { createRoute } from "@tanstack/react-router";
import { ROUTES } from "@/core/const/routes.const";
import { protectedLayout } from "@/modules/shared/layouts/protected.layout";
import { WorkspacePage } from "@/modules/workspaces/pages/workspace.page";

export const workspacesRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: ROUTES.workspaces.root.path,
  //@ts-ignore
  component: () => <WorkspacePage />,
});
