import { ROUTES } from "@/core/const/routes.const";
import { rootRoute } from "@/core/lib/tanstack-router";
import { createRoute, redirect } from "@tanstack/react-router";

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "admin",
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: ROUTES.auth.signIn.href,
        search: {
          redirectPath: location.href,
        },
      });
    }

    if (context.user.role === "regular") {
      throw redirect({ to: "/" });
    }
  },
  component: () => <>Admin</>,
});
