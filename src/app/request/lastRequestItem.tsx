"use client";

import { useAppSelector } from "@/hooks/redux";
import { TApp, TAppLiveRequest } from "@/types/app";
import { elapsedTime } from "@/utils/elapsedTime";
import React, { useEffect, useState } from "react";
import { SyncLoader } from "@/app/shared/loader/syncLoader";

interface LastRequestItemProps {
  app: TApp;
}

export const LastRequestItem: React.FC<LastRequestItemProps> = (props) => {
  const app = props.app;
  const startedAt = app.requests ? app.requests[0]?.startedAt : "";
  const lastReqId = app.requests ? app.requests[0]?.id : "";
  const [elapseTime, setElapseTime] = useState(elapsedTime(startedAt));
  const [lastRequestId, setLastRequestId] = useState<string>(lastReqId);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const appLiveRequest = useAppSelector((state) => state.appLiveRequest);

  const appLastRequestIdFromStore = appLiveRequest?.apps[`${app.id}`]?.requests
    ? appLiveRequest?.apps[`${app.id}`].requests[0]?.id
    : "";

  // update startedAt value at the start of every minute
  useEffect(() => {
    const updateElapsedTime = () => {
      setElapseTime(elapsedTime(startedAt));
    };

    const now = new Date();
    const delayToNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const initialTimeoutId = setTimeout(() => {
      updateElapsedTime();
      const intervalId = setInterval(updateElapsedTime, 60000);

      return () => clearInterval(intervalId);
    }, delayToNextMinute);

    return () => clearTimeout(initialTimeoutId);
  }, [startedAt]);

  useEffect(() => {
    const updateRequestInProgressHandler = () => {
      console.log("Inside progress useEffect");
      const updatedApp = appLiveRequest?.apps[`${app.id}`] as TAppLiveRequest;

      console.log("updated app from store:", updatedApp);

      if (updatedApp?.id) return;
      const updatedAppLastRequestId = updatedApp?.requests
        ? updatedApp.requests[0]?.id
        : "";

      if (updatedAppLastRequestId === lastRequestId) {
        setInProgress(() => true);
        console.log("inProgress :", inProgress);
      } else {
        // TODO: to include a setTimeout of minimum 3 seconds and maximum 35 seconds
        // If max 30 secs then fall back the original request started at date
        setInProgress(() => false);
        setLastRequestId(() => updatedAppLastRequestId);
        console.log("inProgress :", inProgress);
      }
    };
    updateRequestInProgressHandler();
  }, [appLastRequestIdFromStore]);

  return (
    <div>
      {inProgress && <SyncLoader label={"In progress"} className="w-6 h-6" />}
      {!inProgress && <span>{elapseTime}</span>}
    </div>
  );
};
