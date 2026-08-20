import { ROUTES } from "@/core/const/routes.const";
import { rootRoute } from "@/core/lib/tanstack-router";
import { createRoute, Outlet, redirect } from "@tanstack/react-router";

export const protectedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "protectedLayout",
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: ROUTES.auth.signIn.href,
        search: {
          redirectPath: location.href,
        },
      });
    }

    if (context.user.role === "regular" && location.pathname.startsWith("/admin")) {
      throw redirect({ to: ROUTES.workspaces.root.href });
    }
  },
  component: () => <Outlet />,
});
