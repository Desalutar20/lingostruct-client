import { createRoute } from "@tanstack/react-router";
import { ROUTES } from "@/core/const/routes.const";
import { adminLayout } from "@/modules/admin/admin.routes";
import { AdminUsersPage } from "@/modules/admin/users/pages/admin-users.page";
import { getUsersSchema } from "@/modules/admin/users/schemas/get-users.schema";
import { UserFiltersProvider } from "@/modules/admin/users/context/user-filters.context";

export const getAdminUsersRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: ROUTES.admin.users.path,
  component: () => (
    <UserFiltersProvider>
      <AdminUsersPage />
    </UserFiltersProvider>
  ),
  validateSearch: getUsersSchema,
});
