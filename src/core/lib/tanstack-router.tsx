import type { User } from "@/core/types/api/shared/user.type";
import type { Nullable } from "@/core/types/common.types";
import { adminRoute } from "@/modules/admin/admin.routes";
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

export const rootRoute = createRootRouteWithContext<{
  user: Nullable<User>;
}>()();

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([
    signUpRoute,
    signInRoute,
    verifyAccountRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
  ]),
  protectedLayout.addChildren([adminRoute, workspacesRoute]),
]);

export const router = createRouter({
  routeTree,
  context: { user: null },
});
