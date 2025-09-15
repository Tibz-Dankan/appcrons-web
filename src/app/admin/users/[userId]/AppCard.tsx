import React, { ReactNode } from "react";
import { TApp, TRequest } from "@/types/app";
import { truncateString } from "@/utils/truncateString";
import { NextRequestTime } from "@/app/request/NextRequestTime";
import { LastRequestItem } from "@/app/request/LastRequestItem";
import { CheckFilledIcon } from "@/app/shared/Icons/CheckFilledIcon";
import { ErrorIconFilled } from "@/app/shared/Icons/ErrorFilledIcon";
import { convertMillisecondsToSeconds } from "@/utils/convertMillisecondsToSeconds";
import { getStatusCodeLabel } from "@/utils/getStatusCodeLabel";
import Link from "next/link";
import { elapsedTime } from "@/utils/elapsedTime";
import { useRouter } from "@/lib/router-events";
import { clientURL } from "@/constants";

interface AppCardProps {
  app: TApp;
}

export const AppCard: React.FC<AppCardProps> = (props) => {
  const app = props.app;
  const router = useRouter();

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

  const navigateToUsersPage = () => {
    router.push(`${clientURL}/admin/users/${app.userId}/app/${app.id}`);
  };

  const hasRequest = app.requests.length > 0;

  return (
    <div
      className="w-full border-[1px] border-color-border-primary 
      rounded-md p-6"
    >
      <div
        className="w-full rounded-md bg-color-bg-secondary rounded-t-md
        py-2 px-4 border-b-[1px] border-color-border-primary
        text-color-text-primary cursor-pointer  hover:bg-[#0ca678]/[0.2]
        focus:bg-[#0ca678]/[0.2]"
        onClick={() => navigateToUsersPage()}
      >
        <span>{truncateString(app.name, 30)}</span>
      </div>

      {/* Last Request Info */}
      <div className="w-full text-color-text-secondary text-sm mt-4">
        <div
          className="w-full flex items-center justify-start gap-2
          text-base text-color-text-primary"
        >
          <span className="text-base font-semibold">Last Request</span>
        </div>
        <div className="w-full flex items-center justify-start gap-2 h-10">
          <span className="mr-4">Made:</span>
          <LastRequestItem app={app} />
        </div>
        <div className="w-full flex items-center justify-start gap-2">
          <span>Duration:</span>
          <span>{getRequestDuration(app.requests)}</span>
        </div>
        <div
          className="w-full flex items-center justify-start gap-2
           mt-2"
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
           border-b-[1px] border-color-border-primary py-3"
        >
          <span>Next Request:</span>
          <NextRequestTime appId={app.id} />
        </div>
      </div>

      {/* Application Info */}
      <div className="w-full text-sm text-color-text-secondary">
        <div
          className="w-full flex items-center justify-start gap-2
          text-base py-2 text-color-text-primary"
        >
          <span className="text-base font-semibold">Info</span>
        </div>
        <div
          className="w-full flex items-center justify-start gap-2
          mt-2s"
        >
          <Link
            href={`${app.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline focus:underline"
          >
            {truncateString(app.url, 50)}
          </Link>
        </div>
        <div
          className="w-full flex items-center justify-start gap-2
          mt-3"
        >
          <span className="">Request Interval:</span>
          <span>{app.requestInterval} minutes</span>
        </div>
        <div
          className="w-full flex items-center justify-start gap-2
          mt-3"
        >
          <span className="">Added:</span>
          <span>{elapsedTime(app.createdAt)}</span>
        </div>
        <div
          className="w-full flex items-center justify-start gap-2
          mt-3"
        >
          <span className="">Last updated:</span>
          <span>{elapsedTime(app.updatedAt)}</span>
        </div>
        <div
          className="w-full flex items-center justify-start gap-2
          mt-3"
        >
          <span className="">Disabled:</span>
          <span>{app.isDisabled ? "YES" : "NO"} </span>
        </div>
      </div>
    </div>
  );
};
