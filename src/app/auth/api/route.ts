import { Session } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  console.log("Authenticating user...");

  const accessToken = searchParams.get("accessToken")!;
  const user = JSON.parse(searchParams.get("user")!);

  const sessionCookie = new Session().create({
    accessToken: accessToken,
    user: user,
  });

  const destinationUrl = new URL("/dashboard", new URL(request.url).origin);
  const response = NextResponse.redirect(destinationUrl, { status: 302 });
  response.headers.set("Set-Cookie", JSON.stringify(sessionCookie));

  return response;
}
