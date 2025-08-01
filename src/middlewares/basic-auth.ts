import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { type Middleware } from "../lib/middleware-stack";

export function basicAuthMiddleware(middleware: Middleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const isBasicAuthEnabled = process.env.NEXT_PUBLIC_BASIC_AUTH_ENABLE === "true";

    if (isBasicAuthEnabled) {
      const authHeader = request.headers.get("authorization");

      if (!authHeader) {
        return new NextResponse("Unauthorized", {
          status: 401,
          headers: {
            "WWW-Authenticate": 'Basic realm="Secure Area"',
          },
        });
      }

      try {
        const base64Credentials = authHeader.split(" ")[1];
        const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
        const [username, password] = credentials.split(":");

        const validUsername = process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME;
        const validPassword = process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD;

        if (username !== validUsername || password !== validPassword) {
          return new NextResponse("Invalid credentials", {
            status: 401,
          });
        }
      } catch {
        return new NextResponse("Invalid authorization header", {
          status: 401,
        });
      }
    }

    // Nếu Basic Auth pass hoặc không được enable, tiếp tục với middleware tiếp theo
    return middleware(request, event, response);
  };
}
