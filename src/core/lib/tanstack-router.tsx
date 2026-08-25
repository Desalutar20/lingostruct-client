import type { User } from "@/core/types/api/shared/user.type";
import type { Nullable } from "@/core/types/common.types";
import { adminIndexRoute, adminRoute } from "@/modules/admin/admin.routes";
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
import { adminUsersRoute } from "@/modules/admin/users/admin-users.routes";
import { ErrorBoundary } from "@/core/components/error-boundary/error-boundary";

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
    adminRoute.addChildren([adminIndexRoute, adminUsersRoute]),
    workspacesRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
  context: { user: null },
});
