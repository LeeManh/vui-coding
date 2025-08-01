export const ROUTE_PATHS = {
  HOME: "/",
  AUTH: {
    SIGN_IN: "/auth/signin",
    REGISTER: "/auth/register",
  },
  ARCHIVE: "/archive",
  PROFILE: {
    ROOT: "/profile",
    INFO: "/profile/info",
    EMAIL: "/profile/email",
    PASSWORD: "/profile/password",
  },
  POST: {
    ROOT: "/posts",
  },
} as const;
