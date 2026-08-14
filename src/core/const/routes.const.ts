export const ROUTES = {
  auth: {
    signUp: {
      href: "/auth/sign-up",
      path: "sign-up",
    },
    signIn: {
      href: "/auth/sign-in",
      path: "sign-in",
    },
    accountVerification: {
      href: "/auth/account-verification",
      path: "account-verification",
    },
    forgotPassword: {
      href: "/auth/forgot-password",
      path: "forgot-password",
    },
    resetPassword: {
      href: "/auth/reset-password",
      path: "reset-password",
    },
  },
} as const;
