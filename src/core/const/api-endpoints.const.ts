export const API_ENDPOINTS = {
  auth: {
    signUp: "/auth/sign-up",
    signIn: "/auth/sign-in",
    verifyAccount: "/auth/verify-account",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    logout: "/auth/logout",
  },
  users: {
    me: "/users/me",
    updateProfile: "/users/me",
  },
  files: {
    getPresignedUrl: "/files/presigned-url",
  },
  admin: {
    users: {
      getUsers: "/admin/users",
      setUserBanStatus: (id: string) => `/admin/users/${id}/ban`,
      deleteUser: (id: string) => `/admin/users/${id}`,
    },
  },
} as const;
