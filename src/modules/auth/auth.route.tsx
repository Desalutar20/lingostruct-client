import { createRoute, getRouteApi } from "@tanstack/react-router";
import { AuthLayout } from "./layouts/auth-layout/auth.layout";
import { rootRoute } from "@/core/lib/tanstack-router";
import { SignUpForm } from "@/modules/auth/components/forms/sign-up/sign-up.form";
import { verifyAccountSchema } from "@/modules/auth/schemas/verify-account.schema";
import { VerifyAccount } from "@/modules/auth/components/verify-account/verify-account";

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "auth",
  component: () => <AuthLayout />,
});

export const signUpRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "sign-up",
  component: () => <SignUpForm />,
});

export const verifyAccountRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "verify-account",
  validateSearch: verifyAccountSchema,
  component: () => {
    const data = verifyAccountRoute.useSearch();
    return <VerifyAccount />;
  },
});

authRoute.addChildren([signUpRoute, verifyAccountRoute]);
