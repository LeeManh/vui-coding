import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export type Middleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

type MiddlewareFactory = (middleware: Middleware) => Middleware;

export function stackMiddleware(middlewareFactories: MiddlewareFactory[], index = 0): Middleware {
  const currentFactory = middlewareFactories[index];

  if (currentFactory) {
    const nextMiddleware = stackMiddleware(middlewareFactories, index + 1);
    return currentFactory(nextMiddleware);
  }

  return (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    return response;
  };
}
