import { useEffect } from "react";
import { backendURL } from "@/constants";

import {
  showCardNotification,
  hideCardNotification,
} from "@/store/actions/notification";

import { EventSourcePolyfill } from "event-source-polyfill";
import { TAppLiveRequest } from "@/types/app";
import { useAppDispatch, useAppSelector } from "./redux";
import { updateAppLiveRequest } from "@/store/actions/appLiveRequests";
import { addOneRequest } from "@/store/actions/request";

export const useGetAppLiveRequest = async () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const userId = useAppSelector((state) => state.auth.user.id);

  const dispatch: any = useAppDispatch();

  useEffect(() => {
    if (!accessToken || !userId) return;
    const eventSource = new EventSourcePolyfill(
      `${backendURL}/requests/get-live`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const onmessage = async (event: any) => {
      const parsedData = JSON.parse(event.data) as TAppLiveRequest;
      const message = parsedData.message;
      if (message === "heartbeat" || message === "warmup") return;

      const parsedUserId = parsedData.userId;
      if (!parsedUserId) return;

      dispatch(updateAppLiveRequest({ appId: parsedData.id, app: parsedData }));
      dispatch(addOneRequest(parsedData.requests[0]));
    };

    const onerror = async (error: any) => {
      if (error.status === 401) {
        dispatch(
          showCardNotification({ type: "error", message: error.message })
        );
        setTimeout(() => {
          dispatch(hideCardNotification());
        }, 5000);
      }
    };

    eventSource.onmessage = onmessage;
    eventSource.onerror = onerror;

    return () => {
      eventSource.close();
    };
  }, [accessToken, userId, dispatch]);

  return {};
};
