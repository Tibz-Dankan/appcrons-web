import { notificationActions } from "../index";
import { TAuth } from "@/types/auth";
import { clientURL } from "@/constants";

export const authenticate = (accessToken: string, user: TAuth) => {
  localStorage.setItem(
    "session",
    JSON.stringify({ accessToken: accessToken, user: user })
  );
  return async (dispatch: any) => {
    const response = await fetch(
      `${clientURL}/auth/api/?accessToken=${accessToken}&user=${JSON.stringify(
        user
      )}`
    );

    if (!response.ok) {
      const error = await response.json();
      dispatch(
        notificationActions.showCardNotification({
          type: "error",
          message: error.message,
        })
      );
      setTimeout(() => {
        dispatch(notificationActions.hideCardNotification());
      }, 5000);
      throw new Error(error.message);
    }

    return await response.json();
  };
};
