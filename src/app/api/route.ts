export async function GET(req: Request) {
  const isBasicAuthEnable = process.env.NEXT_PUBLIC_BASIC_AUTH_ENABLE === "true";
  console.log("isAuthEnable", isBasicAuthEnable);

  if (isBasicAuthEnable) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return new Response("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
      });
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, password] = credentials.split(":");

    const validUsername = process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME;
    const validPassword = process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD;

    if (username !== validUsername || password !== validPassword) {
      return new Response("Invalid credentials", {
        status: 401,
      });
    }
  }

  return new Response("Authorized", {
    status: 200,
  });
}
