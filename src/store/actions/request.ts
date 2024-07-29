import { TRequest, TRequestPayload } from "@/types/app";
import { requestActions } from "../index";

export const updateRequestList = ({ appId, requests }: TRequestPayload) => {
  return async (dispatch: any) => {
    dispatch(requestActions.update({ appId: appId, requests: requests }));
  };
};

export const addOneRequest = (request: TRequest) => {
  return async (dispatch: any) => {
    dispatch(requestActions.AddOne({ request: request }));
  };
};

export const clearRequestList = () => {
  return async (dispatch: any) => {
    dispatch(requestActions.clear());
  };
};
