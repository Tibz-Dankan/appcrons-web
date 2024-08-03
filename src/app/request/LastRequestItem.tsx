"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { TApp, TAppLiveRequest } from "@/types/app";
import React, { useEffect, useState } from "react";
import { SettingsLoaderIcon } from "@/app/shared/loader/SettingsLoader";
import { LastRequestTime } from "@/app/request/LastRequestTime";
import { updateAppLiveRequest } from "@/store/actions/appLiveRequests";
import { Spinner } from "@/app/shared/loader/Spinner";

interface LastRequestItemProps {
  app: TApp;
}

export const LastRequestItem: React.FC<LastRequestItemProps> = (props) => {
  const app = useAppSelector((state) =>
    state.app.apps.find((app) => app.id == props.app.id)
  ) as TApp;

  const [inProgress, setInProgress] = useState<boolean>(false);
  const appLiveRequest = useAppSelector((state) => state.appLiveRequest);
  const updatedApp = appLiveRequest?.apps[`${app.id}`] as TAppLiveRequest;
  const isLoadingRequest: boolean = appLiveRequest.isLoading;

  const dispatch: any = useAppDispatch();

  useEffect(() => {
    const updateRequestInProgressHandler = () => {
      if (!updatedApp?.id) return;

      const canStartInProgressLoader: boolean =
        inProgress === false && updatedApp?.inProgress === true;
      const canStopInProgressLoader: boolean =
        inProgress === true && updatedApp?.inProgress === false;

      if (canStartInProgressLoader) {
        setInProgress(() => true);

        // Stop a Loader after 32 seconds and update
        // app with inProgress marked to false when
        // the backend doesn't respond
        const timeoutId = setTimeout(() => {
          setInProgress(() => false);

          const currentApp: TAppLiveRequest = JSON.parse(
            JSON.stringify(updatedApp)
          );
          currentApp.inProgress = false;

          dispatch(
            updateAppLiveRequest({ appId: currentApp.id, app: currentApp })
          );
        }, 32000);
        return () => clearTimeout(timeoutId);
      }

      // Delay hiding Loader for 5 seconds
      if (canStopInProgressLoader) {
        const timeoutId = setTimeout(() => {
          setInProgress(() => false);
        }, 5000);
        return () => clearTimeout(timeoutId);
      }
    };
    updateRequestInProgressHandler();
  }, [updatedApp?.inProgress]);

  return (
    <div className="flex items-center justify-start w-36">
      {isLoadingRequest && (
        <div
          className="flex items-center justify-center
           bg-color-bg-secondary rounded-md px-2 py-[6px]"
        >
          <Spinner className="w-4 h-4" label="Loading" />
        </div>
      )}

      {!isLoadingRequest && (
        <>
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
        </>
      )}
    </div>
  );
};
