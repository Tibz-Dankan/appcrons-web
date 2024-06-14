import { appActions } from "../index";
import { TAppListPayload, TAppPayload } from "@/types/app";

export const updateApps = (apps: TAppListPayload) => {
  return async (dispatch: any) => {
    dispatch(appActions.update(apps));
  };
};

export const updateOneApp = (app: TAppPayload) => {
  return async (dispatch: any) => {
    dispatch(appActions.updateOne(app));
  };
};

export const deleteOneApp = (appId: string) => {
  return async (dispatch: any) => {
    dispatch(appActions.deleteOne({ appId: appId }));
  };
};

export const clearAllApps = () => {
  return async (dispatch: any) => {
    dispatch(appActions.clearAll());
  };
};
