import { createRoute, redirect } from "@tanstack/react-router";
import { AuthLayout } from "./layouts/auth.layout";
import { rootRoute } from "@/core/lib/tanstack-router";
import { verifyAccountSchema } from "@/modules/auth/schemas/verify-account.schema";
import { VerifyAccount } from "@/modules/auth/components/verify-account/verify-account";
import { SignUpForm } from "@/modules/auth/components/forms/sign-up/sign-up.form";
import { SignInForm } from "@/modules/auth/components/forms/sign-in/sign-in.form";
import z from "zod";
import { ROUTES } from "@/core/const/routes.const";
import { ForgotPasswordForm } from "@/modules/auth/components/forms/forgot-password/forgot-password.form";
import { ResetPasswordForm } from "./components/forms/reset-password/reset-password.form";
import { resetPasswordSchema } from "@/modules/auth/schemas/reset-password.schema";

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "auth",
  beforeLoad: ({ context }) => {
    if (context.user && location.pathname !== ROUTES.auth.resetPassword.href) {
      throw redirect({ to: "/" });
    }
  },
  component: () => <AuthLayout />,
});

export const signUpRoute = createRoute({
  getParentRoute: () => authRoute,
  path: ROUTES.auth.signUp.path,
  component: () => <SignUpForm />,
});

export const signInRoute = createRoute({
  getParentRoute: () => authRoute,
  path: ROUTES.auth.signIn.path,
  validateSearch: z.object({ redirectPath: z.string().trim().optional() }),
  component: () => {
    const { redirectPath } = signInRoute.useSearch();
    return <SignInForm redirectPath={redirectPath} />;
  },
});

export const verifyAccountRoute = createRoute({
  getParentRoute: () => authRoute,
  path: ROUTES.auth.accountVerification.path,
  validateSearch: verifyAccountSchema,
  component: () => {
    const data = verifyAccountRoute.useSearch();
    return <VerifyAccount data={data} />;
  },
});

export const forgotPasswordRoute = createRoute({
  getParentRoute: () => authRoute,
  path: ROUTES.auth.forgotPassword.path,
  component: () => <ForgotPasswordForm />,
});

export const resetPasswordRoute = createRoute({
  getParentRoute: () => authRoute,
  path: ROUTES.auth.resetPassword.path,
  validateSearch: z.object(resetPasswordSchema.shape).pick({ email: true, token: true }),
  component: () => {
    const data = resetPasswordRoute.useSearch();

    return <ResetPasswordForm data={data} />;
  },
});
