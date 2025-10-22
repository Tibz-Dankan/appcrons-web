import {
  authActions,
  appActions,
  appLiveRequestActions,
  requestActions,
} from "@/store";
import { TAuth, TUser } from "@/types/auth";

export const logout = () => {
  return (dispatch: any) => {
    localStorage.removeItem("session");
    dispatch(authActions.logout());
    dispatch(appActions.clearAll());
    dispatch(appLiveRequestActions.clearAll());
    dispatch(requestActions.clear());
  };
};

export const updateUser = (user: TUser) => {
  return (dispatch: any) => {
    dispatch(authActions.updateUser(user));

    const authStr = localStorage.getItem("session")!;
    if (!authStr) return;
    const auth = JSON.parse(authStr) as TAuth;

    localStorage.setItem(
      "session",
      JSON.stringify({ accessToken: auth.accessToken, user: user })
    );
  };
};
