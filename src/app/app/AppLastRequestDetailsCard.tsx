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

  const getStatusCodeIcon = (statusCode: number): ReactNode => {
    const code = statusCode.toString();

    const isSuccessCode = code.startsWith("2");
    const isErrorCode = code.startsWith("4") || code.startsWith("5");

    if (isSuccessCode)
      return <CheckFilledIcon className="text-success w-[18px] h-[18px]" />;
    if (isErrorCode) return <ErrorIconFilled className="text-error" />;
  };

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
        <span className="text-base font-semibold">Last request</span>
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
        <span>Latency:</span>
        <span>{convertMillisecondsToSeconds(app.requests[0].duration)}s</span>
      </div>
      <div
        className="w-full flex items-center justify-start gap-2
         px-6 mt-2"
      >
        <span className="mr-2">Status:</span>
        <span>{getStatusCodeIcon(app.requests[0].statusCode)}</span>
        <span>{app.requests[0].statusCode}</span>
        <span>{getStatusCodeLabel(app.requests[0].statusCode)}</span>
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
