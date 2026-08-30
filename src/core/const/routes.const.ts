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
  workspaces: {
    root: {
      href: "/workspaces",
      path: "workspaces",
    },
  },
  admin: {
    users: {
      href: "/admin/users",
      path: "admin/users",
    },
    workspaces: {
      root: {
        href: "/admin/workspaces",
        path: "admin/workspaces",
      },
      specificWorkspace: {
        href: (id: string) => `admin/workspaces/${id}`,
        path: `admin/workspaces/$id`,
      },
    },
  },
} as const;
