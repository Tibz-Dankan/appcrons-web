import { Session } from "@/lib/session";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  console.log("Authenticating user...");

  const accessToken = searchParams.get("accessToken")!;
  const user = JSON.parse(searchParams.get("user")!);

  const sessionCookie = new Session().create({
    accessToken: accessToken,
    user: user,
  });

  return new Response("User session set successfully!", {
    status: 200,
    headers: { "Set-Cookie": JSON.stringify(sessionCookie) },
  });
}
