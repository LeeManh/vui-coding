import createMiddleware from "next-intl/middleware";
import { routing } from "../i18n/routing";
import { Middleware } from "../lib/stack-middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const intlMiddlewareBase = createMiddleware(routing);

export const intlMiddleware = (next: Middleware): Middleware => {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const intlResponse = intlMiddlewareBase(request);

    if (intlResponse) return intlResponse;

    // Otherwise continue with the next middleware
    return next(request, event, response);
  };
};
