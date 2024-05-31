import { appLiveRequestActions } from "../index";
import { TAppLiveRequestPayload } from "@/types/app";

export const updateAppLiveRequest = (
  appLiveRequest: TAppLiveRequestPayload
) => {
  return async (dispatch: any) => {
    dispatch(appLiveRequestActions.update(appLiveRequest));
  };
};

export const clearAppLiveRequest = (appId: string) => {
  return async (dispatch: any) => {
    dispatch(appLiveRequestActions.clear(appId));
  };
};

export const clearAllAppLiveRequest = () => {
  return async (dispatch: any) => {
    dispatch(appLiveRequestActions.clearAll());
  };
};
