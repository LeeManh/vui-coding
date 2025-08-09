export const ROUTE_PATHS = {
  HOME: "/",
  AUTH: {
    SIGN_IN: "/auth/signin",
    REGISTER: "/auth/register",
  },
  ARCHIVE: "/archive",
  ME: {
    ROOT: "/me",
    OVERVIEW: "/me",
    INFO: "/me/info",
    EMAIL: "/me/email",
    PASSWORD: "/me/password",
    HISTORY: "/me/history",
    BOOKMARK_POST: "/me/bookmark/post",
    BOOKMARK_SERIES: "/me/bookmark/series",
  },
  POST: {
    ROOT: "/posts",
    DETAIL: (id: string) => `/posts/${id}`,
  },
  DASHBOARD: {
    ROOT: "/dashboard",
  },
  SERIES: {
    ROOT: "/series",
    DETAIL: (id: string) => `/series/${id}`,
  },
  ABOUT: "/about",
} as const;
