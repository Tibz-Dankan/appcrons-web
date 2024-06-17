import { Session } from "@/lib/session";

export async function POST(request: Request) {

  new Session().clear();

  return new Response("", {
    status: 200,
    headers: { "Set-Cookie": "" },
  });
}
