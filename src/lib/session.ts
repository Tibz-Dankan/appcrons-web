import { TAuth } from "@/types/auth";
import { jwtDecode } from "jwt-decode";
// import { cookies } from "next/headers";
import cookies from "js-cookie";

export class Session {
  // Creates new session for the current user
  create = (auth: TAuth): void => {
    const decodedToken = jwtDecode(auth.accessToken);
    console.log(decodedToken);
    const tokenExpiresInSeconds = decodedToken.exp;

    const cookieExpiryDate = new Date(
      new Date().getTime() + tokenExpiresInSeconds! * 1000
    );
    console.log("cookieExpiryDate::", cookieExpiryDate);

    cookies.set("session", JSON.stringify(auth), {
      expires: cookieExpiryDate,
      httpOnly: true,
    });
  };

  //   Gets current user session
  get = (): TAuth | null => {
    const session = cookies.get("session");
    if (!session) return null;
    return JSON.parse(session);
  };

  //  Gets  Bearer token for the current user session
  getBearerToken = (): string => {
    const session = cookies.get("session");
    if (!session) return "";
    const parsedSession = JSON.parse(session) as TAuth;

    return `Bearer ${parsedSession.accessToken}`;
  };

  //   Destroys current user session
  clear = (): void => {
    cookies.remove("session");
  };
}
