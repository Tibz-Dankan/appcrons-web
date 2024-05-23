import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TAuth } from "@/types/auth";
import { jwtDecode } from "jwt-decode";
import { routes } from "@/routes";

export const middleware = (request: NextRequest) => {
  console.log("req pathname: ", request.nextUrl.pathname);

  // TODO: implement redirectTo, functionality

  // Check for user session to restrict access to protected routes
  if (request.nextUrl.pathname.includes("/dashboard" || "/app")) {
    const session = request.cookies.get("session")?.value;
    if (!session) {
      console.log("Redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    console.log("TAuth session", session);

    const parsedAuth = JSON.parse(session) as TAuth;
    const decodedToken = jwtDecode(parsedAuth.accessToken);
    console.log(decodedToken);
    const tokenExpiresInMilliSeconds = decodedToken.exp! * 1000;

    const isTokenExpired =
      new Date(Date.now()) > new Date(tokenExpiresInMilliSeconds);

    if (!isTokenExpired) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
};
