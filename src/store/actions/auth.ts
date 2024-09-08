import {
  authActions,
  appActions,
  appLiveRequestActions,
  requestActions,
} from "@/store";

export const logout = () => {
  return (dispatch: any) => {
    localStorage.removeItem("session");
    dispatch(authActions.logout());
    dispatch(appActions.clearAll());
    dispatch(appLiveRequestActions.clearAll());
    dispatch(requestActions.clear());
  };
};
