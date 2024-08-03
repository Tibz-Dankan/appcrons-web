"use client";

import React from "react";
import { TApp } from "@/types/app";
import { truncateString } from "@/utils/truncateString";
import { clientURL } from "@/constants";
import { Link, useRouter } from "@/lib/router-events";
import { LastRequestItem } from "@/app/request/LastRequestItem";
import { EnableDisableApp } from "@/app/app/EnableDisableApp";
import { useAppSelector } from "@/hooks/redux";
import { NextRequestTime } from "@/app/request/NextRequestTime";
import { ToolTip } from "@/app/shared/ToolTip";
import { InfoIcon } from "@/app/shared/Icons/InfoIcon";
import { useGetWindowWidth } from "@/hooks/UseGetWindowWidth";
import { useGetAppsLastRequest } from "@/hooks/UseGetAppsLastRequest";

export const AppList: React.FC = () => {
  const router = useRouter();
  const apps = useAppSelector((state) => state.app.apps);
  const { width } = useGetWindowWidth();

  useGetAppsLastRequest();

  const isLastElement = (list: any[], index: number): boolean => {
    return index === list.length - 1;
  };

  const navigateToAppPage = (appId: string) => {
    router.push(`${clientURL}/app/${appId}`);
  };

  const showLastRequest = (app: TApp): boolean => {
    const hasNoRequests = app.requests.length === 0;
    if (hasNoRequests) return false;
    return true;
  };

  const getApplicationName = (name: string): string => {
    if (width < 400) {
      return truncateString(name, 6);
    }
    if (width < 450) {
      return truncateString(name, 10);
    }
    if (width < 480) {
      return truncateString(name, 12);
    }
    if (width < 520) {
      return truncateString(name, 15);
    }
    return name;
  };

  const showURLEndpoint: boolean = width >= 1024;
  const showNextRequest: boolean = width >= 600;
  const showApplicationNameTitle: boolean = width >= 450;
  const showToolTip: boolean = width >= 450;

  return (
    <div className="overflow-x-auto">
      <table
        className="border-separate border-spacing-0 w-full
         overflow-x-auto"
      >
        <thead>
          <tr
            className="[&>*]:bg-color-bg-secondary [&>*]:border-y-[1px] 
             [&>*]:border-color-border-primary text-sm"
          >
            <th
              className="px-2 pl-4 py-4 text-start border-l-[1px] 
              border-color-border-primary rounded-tl-md"
            >
              <span>
                <span>Application</span>
                {showApplicationNameTitle && <span className="ml-1">name</span>}
              </span>
            </th>
            {showURLEndpoint && (
              <th className="px-2 py-4 text-start">
                <span>URL endpoint</span>
              </th>
            )}
            <th className="px-2 py-4 text-start">
              <div className="flex items-center gap-2">
                <span>Last request</span>
                {showToolTip && (
                  <span data-tooltip-id="last-request">
                    <InfoIcon className="w-[18px] h-[18px]" />
                  </span>
                )}
                <ToolTip
                  id={"last-request"}
                  content={
                    <span className="text-sm font-[500]">
                      Last request is the most latest time an application
                      received a request
                    </span>
                  }
                />
              </div>
            </th>
            {showNextRequest && (
              <th className="px-2 py-4 text-start">
                <div className="flex items-center gap-2">
                  <span>Next request</span>
                  {showToolTip && (
                    <span data-tooltip-id="next-request">
                      <InfoIcon className="w-[18px] h-[18px]" />
                    </span>
                  )}
                  <ToolTip
                    id={"next-request"}
                    content={
                      <span className="text-sm font-[500]">
                        Next request is the time an application will receive a
                        request
                      </span>
                    }
                  />
                </div>
              </th>
            )}
            <th
              className="px-2 py-4 text-start border-r-[1px] 
              border-color-border-primary rounded-tr-md"
            >
              <div className="flex items-center gap-2">
                <span>Enabled</span>
                {showToolTip && (
                  <span data-tooltip-id="enabled">
                    <InfoIcon className="w-[18px] h-[18px]" />
                  </span>
                )}
                <ToolTip
                  id={"enabled"}
                  content={
                    <span className="text-sm font-[500]">
                      Enabled indicates the status whether an application is
                      able to receive requests or not
                    </span>
                  }
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app, index) => {
            return (
              <tr
                className="h-14s h-12 [&>*]:border-b-[1px] 
                [&>*]:border-color-border-primary text-sm"
                key={index}
              >
                <td
                  className={`px-2 pl-4 border-l-[1px] 
                  border-color-border-primary cursor-pointer
                  hover:bg-[#0ca678]/[0.2] focus:bg-[#0ca678]/[0.2]
                  ${isLastElement(apps, index) && "rounded-bl-md"}`}
                  onClick={() => navigateToAppPage(app.id)}
                >
                  <span className="underline">
                    {getApplicationName(app.name)}
                  </span>
                </td>
                {showURLEndpoint && (
                  <td className="px-2 cursor-pointer">
                    <Link
                      href={`${app.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline focus:underline"
                    >
                      <span>{truncateString(app.url, 50)}</span>
                    </Link>
                  </td>
                )}
                <td className="px-2">
                  {showLastRequest(app) && <LastRequestItem app={app} />}
                  {!showLastRequest(app) && (
                    <span className="font-semibold">N/A</span>
                  )}
                </td>
                {showNextRequest && (
                  <td className="px-2">
                    <NextRequestTime appId={app.id} />
                  </td>
                )}
                <td
                  className={`px-2 border-r-[1px] border-color-border-primary
                  ${isLastElement(apps, index) && "rounded-br-md"}`}
                >
                  <EnableDisableApp app={app} onEnableDisable={() => {}} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
