import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TAuth } from "@/types/auth";
import { jwtDecode } from "jwt-decode";

export const middleware = (request: NextRequest) => {
  console.log("req pathname: ", request.nextUrl.pathname);

  // TODO: implement redirectTo, functionality

  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
  const isAppRoute = request.nextUrl.pathname.startsWith("/app");

  const protectedRoute = isDashboardRoute || isAppRoute;

  if (protectedRoute) {
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
