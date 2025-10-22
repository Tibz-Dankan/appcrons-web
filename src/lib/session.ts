import { AuthService } from "@/services/auth.service";
import { TAuth, TUser } from "@/types/auth";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export class Session {
  // Creates new session for the current user
  create = (auth: TAuth) => {
    const decodedToken = jwtDecode(auth.accessToken);
    const tokenExpMs = decodedToken.exp;
    const cookieExpDate = new Date(tokenExpMs! * 1000);

    return cookies().set("session", JSON.stringify(auth), {
      expires: cookieExpDate,
      httpOnly: true,
    });
  };

  // Gets current user session
  get = (): TAuth | null => {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return JSON.parse(session);
  };

  // Gets current user session with user details from the main backend
  getSync = async (): Promise<TAuth | null> => {
    let user: TUser;
    const sessionStr = cookies().get("session")?.value;

    if (!sessionStr) return null;
    const session = JSON.parse(sessionStr) as TAuth;

    try {
      const response = await new AuthService().getUserDetails({
        id: session.user.id,
        accessToken: session.accessToken,
      });

      user = response.data;

      if (!!user.id) {
        session.user = user;
        return session;
      }
    } catch (error) {
      console.log("error fetching user details: ", error);
    }

    return JSON.parse(sessionStr);
  };

  // Gets  Bearer token for the current user session
  getBearerToken = (): string => {
    const session = cookies().get("session")?.value;
    if (!session) return "";
    const parsedSession = JSON.parse(session) as TAuth;

    return `Bearer ${parsedSession.accessToken}`;
  };

  //   Destroys current user session
  clear = (): void => {
    cookies().set("session", "", { expires: new Date(0) });
  };
}

const getUserDetails = (session: TAuth) => {};
