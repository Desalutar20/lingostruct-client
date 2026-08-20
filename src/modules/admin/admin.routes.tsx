import { protectedLayout } from "@/modules/shared/layouts/protected.layout";
import { createRoute } from "@tanstack/react-router";

export const adminRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "admin",
  component: () => <>Admin</>,
});
