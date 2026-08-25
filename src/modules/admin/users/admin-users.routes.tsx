import { createRoute } from "@tanstack/react-router";
import { ROUTES } from "@/core/const/routes.const";
import { adminRoute } from "@/modules/admin/admin.routes";
import { AdminUsersPage } from "@/modules/admin/users/pages/admin-users.page";
import { getUsersSchema } from "@/modules/admin/users/schemas/get-users.schema";

export const adminUsersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: ROUTES.admin.users.path,
  component: () => <AdminUsersPage />,
  validateSearch: getUsersSchema,
});
