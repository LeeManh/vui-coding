export const ROUTE_PATHS = {
  HOME: "/",
  AUTH: {
    SIGN_IN: "/auth/signin",
    REGISTER: "/auth/register",
  },
  ARCHIVE: "/archive",
  ME: {
    ROOT: "/me/info",
    INFO: "/me/info",
    EMAIL: "/me/email",
    PASSWORD: "/me/password",
    HISTORY: "/me/history",
    BOOKMARK_POST: "/me/bookmark/post",
    BOOKMARK_SERIES: "/me/bookmark/series",
  },
  POST: {
    ROOT: "/posts",
  },
  DASHBOARD: {
    ROOT: "/dashboard",
  },
} as const;
