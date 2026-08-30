import type { User } from "@/core/types/api/shared/user.type";
import type { Nullable } from "@/core/types/common.types";
import { adminIndexRoute, adminLayout } from "@/modules/admin/admin.routes";
import {
  authRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  signInRoute,
  signUpRoute,
  verifyAccountRoute,
} from "@/modules/auth/auth.routes";
import { protectedLayout } from "@/modules/shared/layouts/protected.layout";
import { workspacesRoute } from "../../modules/workspaces/workspaces.routes";
import { createRootRouteWithContext, createRouter } from "@tanstack/react-router";
import { getAdminUsersRoute } from "@/modules/admin/users/admin-user.routes";
import { ErrorBoundary } from "@/core/components/error-boundary/error-boundary";
import {
  getAdminWorkspaceRoute,
  getAdminWorkspacesRoute,
} from "@/modules/admin/workspaces/admin-workspace.routes";
import type { AdminWorkspace } from "@/core/types/api/admin/admin-workspace.type";

declare module "@tanstack/react-router" {
  interface HistoryState {
    workspace?: AdminWorkspace;
  }
}

export const rootRoute = createRootRouteWithContext<{
  user: Nullable<User>;
}>()({ errorComponent: ({ error, reset, info }) => <ErrorBoundary error={error} /> });

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([
    signUpRoute,
    signInRoute,
    verifyAccountRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
  ]),
  protectedLayout.addChildren([
    adminLayout.addChildren([
      adminIndexRoute,
      getAdminUsersRoute,
      getAdminWorkspacesRoute,
      getAdminWorkspaceRoute,
    ]),
    workspacesRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
  context: { user: null },
});
