import { stackMiddleware } from "./lib/stack-middleware";
import { basicAuthMiddleware, intlMiddleware } from "./middlewares";

export default stackMiddleware([basicAuthMiddleware, intlMiddleware]);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
