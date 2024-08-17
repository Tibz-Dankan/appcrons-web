"use client";
import React, { ReactNode } from "react";
import { useAppSelector } from "@/hooks/redux";
import { LastRequestItem } from "@/app/request/LastRequestItem";
import { convertMillisecondsToSeconds } from "@/utils/convertMillisecondsToSeconds";
import { CheckFilledIcon } from "@/app/shared/Icons/CheckFilledIcon";
import { ErrorIconFilled } from "@/app/shared/Icons/ErrorFilledIcon";
import { getStatusCodeLabel } from "@/utils/getStatusCodeLabel";
import { NextRequestTime } from "@/app/request/NextRequestTime";
import { useGetAppsLastRequest } from "@/hooks/UseGetAppsLastRequest";
import { TRequest } from "@/types/app";

interface AppLastRequestDetailsCardProps {
  appId: string;
}

export const AppLastRequestDetailsCard: React.FC<
  AppLastRequestDetailsCardProps
> = (props) => {
  const app = useAppSelector((state) =>
    state.app.apps.find((app) => app.id === props.appId)
  )!;

  useGetAppsLastRequest();

  const getStatusCodeIcon = (request: TRequest[]): ReactNode => {
    const hasRequest = request.length > 0;
    if (!hasRequest) return "N/A";

    const code = request[0].statusCode.toString();
    const isSuccessCode = code.startsWith("2");
    const isErrorCode = code.startsWith("4") || code.startsWith("5");

    if (isSuccessCode)
      return <CheckFilledIcon className="text-success w-[18px] h-[18px]" />;
    if (isErrorCode) return <ErrorIconFilled className="text-error" />;
  };

  const getRequestDuration = (request: TRequest[]): string => {
    const hasRequest = request.length > 0;
    if (!hasRequest) return "N/A";
    return `${convertMillisecondsToSeconds(request[0].duration)}s`;
  };

  const hasRequest = app.requests.length > 0;

  return (
    <div
      className="w-full flex flex-col items-start justify-center
       gap-0 border-[1px] border-color-border-primary rounded-md 
       bg-color-bg-primary text-color-text-secondary"
    >
      <div
        className="w-full flex items-center justify-start gap-2
        px-6 text-base bg-color-bg-secondary rounded-t-md py-2
        border-b-[1px] border-color-border-primary text-color-text-primary"
      >
        <span className="text-base font-semibold">Last Request</span>
      </div>
      <div
        className="w-full flex items-center justify-start gap-2
         px-6 h-10"
      >
        <span className="mr-4">Made:</span>
        <LastRequestItem app={app} />
      </div>
      <div
        className="w-full flex items-center justify-start gap-2
         px-6"
      >
        <span>Duration:</span>
        <span>{getRequestDuration(app.requests)}</span>
      </div>
      <div
        className="w-full flex items-center justify-start gap-2
         px-6 mt-2"
      >
        <span className="mr-3">Status:</span>
        {hasRequest && (
          <div className="flex items-center justify-start gap-2">
            <span>{getStatusCodeIcon(app.requests)}</span>
            <span>{app.requests[0].statusCode}</span>
            <span>{getStatusCodeLabel(app.requests[0].statusCode)}</span>
          </div>
        )}
        {!hasRequest && <span>N/A</span>}
      </div>
      <div
        className="w-full flex items-center justify-start gap-2
         px-6 mt-2 border-t-[1px] border-color-border-primary py-3"
      >
        <span>Next Request:</span>
        <NextRequestTime appId={app.id} />
      </div>
    </div>
  );
};
