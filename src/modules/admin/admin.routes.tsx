import { ROUTES } from "@/core/const/routes.const";
import { AdminLayout } from "@/modules/admin/layouts/admin.layout";
import { protectedLayout } from "@/modules/shared/layouts/protected.layout";
import { createRoute, redirect } from "@tanstack/react-router";

export const adminLayout = createRoute({
  getParentRoute: () => protectedLayout,
  id: "adminLayout",
  component: () => <AdminLayout />,
});

export const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin",
  beforeLoad: () => {
    throw redirect({
      to: ROUTES.admin.users.href,
    });
  },
});
