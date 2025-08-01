import { middlewareStack } from "./lib/middleware-stack";
import { basicAuthMiddleware, intlMiddleware } from "./middlewares";

export default middlewareStack([basicAuthMiddleware, intlMiddleware]);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
