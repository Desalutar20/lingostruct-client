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
import { createRootRouteWithContext, createRouter, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRouteWithContext<{
  user: Nullable<User>;
}>()({
  component: () => <Outlet />,
});

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([
    signUpRoute,
    signInRoute,
    verifyAccountRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
  ]),
  adminRoute,
]);

export const router = createRouter({
  routeTree,
  context: { user: null },
});
