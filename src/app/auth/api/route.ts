import { Session } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  console.log("request.url: ", request.url);

  const accessToken = searchParams.get("accessToken")!;
  const user = JSON.parse(searchParams.get("user")!);

  console.log("accessToken:", accessToken);
  console.log("user:", user);

  const sessionCookie = new Session().create({
    accessToken: accessToken,
    user: user,
  });

  // const destinationUrl = new URL("/dashboard", new URL(request.url).origin);
  // const response = NextResponse.redirect(destinationUrl, { status: 302 });
  // response.headers.set("Set-Cookie", JSON.stringify(sessionCookie));
  // let response = NextResponse.next();
  // response.headers.set("Set-Cookie", JSON.stringify(sessionCookie));

  return new Response("", {
    status: 200,
    headers: { "Set-Cookie": JSON.stringify(sessionCookie) },
  });
}
