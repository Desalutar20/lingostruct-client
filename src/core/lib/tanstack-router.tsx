import { authRoute } from "@/modules/auth/auth.route";
import { createRootRoute, createRouter, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const routeTree = rootRoute.addChildren([authRoute]);
export const router = createRouter({ routeTree });
