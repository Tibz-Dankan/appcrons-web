import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TAuth } from "@/types/auth";
import { jwtDecode } from "jwt-decode";

export const middleware = (request: NextRequest) => {
  console.log("req pathname: ", request.nextUrl.pathname);

  // TODO: implement redirectTo, functionality

  // Check for user session to restrict access to protected routes
  if (request.nextUrl.pathname.includes("/dashboard" || "/app")) {
    const session = request.cookies.get("session")?.value;
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const parsedAuth = JSON.parse(session) as TAuth;
    const decodedToken = jwtDecode(parsedAuth.accessToken);

    const tokenExpInMs = decodedToken.exp! * 1000;
    const isTokenExpired = new Date(Date.now()) > new Date(tokenExpInMs);

    if (isTokenExpired) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.rewrite(new URL(request.nextUrl.pathname, request.url));
  }
};
