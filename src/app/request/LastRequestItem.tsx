"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { TApp, TAppLiveRequest } from "@/types/app";
import React, { useEffect, useState } from "react";
import { SettingsLoaderIcon } from "@/app/shared/loader/SettingsLoader";
import { updateOneApp } from "@/store/actions/app";
import { LastRequestTime } from "@/app/request/LastRequestTime";

interface LastRequestItemProps {
  app: TApp;
}

export const LastRequestItem: React.FC<LastRequestItemProps> = (props) => {
  const app = useAppSelector((state) =>
    state.app.apps.find((app) => app.id == props.app.id)
  ) as TApp;

  const lastRequestId = app.requests ? app.requests[0]?.id : "";
  const [inProgress, setInProgress] = useState<boolean>(false);
  const appLiveRequest = useAppSelector((state) => state.appLiveRequest);
  const updatedApp = appLiveRequest?.apps[`${app.id}`] as TAppLiveRequest;

  const appLastRequestArrivedAt = appLiveRequest?.apps[`${app.id}`]?.arrivedAt
    ? appLiveRequest?.apps[`${app.id}`].arrivedAt
    : "";

  const dispatch: any = useAppDispatch();
  useEffect(() => {
    const updateRequestInProgressHandler = () => {
      if (!updatedApp?.id || updatedApp?.id !== app.id) return;

      const updatedAppLastRequestId = updatedApp?.requests
        ? updatedApp.requests[0]?.id
        : "";

      if (updatedAppLastRequestId === lastRequestId) {
        const nowSeconds = new Date(Date.now()).getSeconds();
        const arrivedAtSeconds = new Date(appLastRequestArrivedAt).getSeconds();
        const isExpiredArrivedAt = nowSeconds - arrivedAtSeconds >= 1;
        if (isExpiredArrivedAt) return;

        setInProgress(() => true);
        // Stop a Loader after 32 seconds when
        // the backend doesn't respond
        const timeoutId = setTimeout(() => {
          setInProgress(() => false);
        }, 32000);

        return () => clearTimeout(timeoutId);
      }

      if (updatedAppLastRequestId !== lastRequestId) {
        dispatch(updateOneApp({ app: updatedApp }));

        // Delay hiding Loader for 5 seconds
        const timeoutId = setTimeout(() => {
          setInProgress(() => false);
        }, 5000);

        return () => clearTimeout(timeoutId);
      }
    };
    updateRequestInProgressHandler();
  }, [appLastRequestArrivedAt]);

  return (
    <div className="flex items-center justify-start w-36">
      {inProgress && (
        <div
          className="flex items-center justify-center
           bg-[#1098ad]/[0.3] rounded-md px-2 py-[6px]"
        >
          <SettingsLoaderIcon
            label={"In progress"}
            className="w-4 h-4"
            labelClassName=""
          />
        </div>
      )}
      {!inProgress && <LastRequestTime appId={props.app.id} />}
    </div>
  );
};
