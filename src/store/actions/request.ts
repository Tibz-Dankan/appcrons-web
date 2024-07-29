import { TRequest } from "@/types/app";
import { requestActions } from "../index";

export const updateRequestList = (requests: TRequest[]) => {
  return async (dispatch: any) => {
    dispatch(requestActions.update({ requests: requests }));
  };
};

export const clearRequestList = () => {
  return async (dispatch: any) => {
    dispatch(requestActions.clear());
  };
};
