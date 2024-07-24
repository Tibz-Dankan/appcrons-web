"use client";

import React from "react";
import { TApp } from "@/types/app";
import { truncateString } from "@/utils/truncateString";
import { clientURL } from "@/constants";
// import { useRouter } from "next/navigation";
import { useRouter } from "@/lib/router-events";
import { LastRequestItem } from "@/app/request/lastRequestItem";
import { EnableDisableApp } from "@/app/app/enableDisableApp";
import { useAppSelector } from "@/hooks/redux";
import { NextRequestTime } from "@/app/request/nextRequestTime";
import { ToolTip } from "@/app/shared/toolTip";
import { InfoIcon } from "../shared/Icons/infoIcon";

interface AppListProps {
  showListHead?: boolean;
}

export const AppList: React.FC<AppListProps> = (props) => {
  const showListHead = props.showListHead ? props.showListHead : true;
  const router = useRouter();
  const apps = useAppSelector((state) => state.app.apps);

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

  // TODO: to cater for no last request when rendering the progress loader
  return (
    <div className="">
      <table
        className="border-separate border-spacing-0 
         w-full overflow-x-auto"
      >
        {showListHead && (
          <thead>
            <tr
              className="[&>*]:bg-color-bg-secondary [&>*]:border-y-[1px] 
               [&>*]:border-color-border-primary text-[12px]"
            >
              <th
                className="px-2 pl-4 py-4 text-start border-l-[1px] 
                border-color-border-primary rounded-tl-md"
              >
                <span className="uppercase">Application Name</span>
              </th>
              <th className="px-2 py-4 text-start">
                <span className="uppercase">URL</span>
              </th>
              <th className="px-2 py-4 text-start">
                <div className="flex items-center gap-2">
                  <span className="uppercase">Last Request</span>
                  <span data-tooltip-id="last-request">
                    <InfoIcon className="w-[18px] h-[18px]" />
                  </span>
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
              <th className="px-2 py-4 text-start">
                <div className="flex items-center gap-2">
                  <span className="uppercase">Next Request</span>
                  <span data-tooltip-id="next-request">
                    <InfoIcon className="w-[18px] h-[18px]" />
                  </span>
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
              <th
                className="px-2 py-4 text-start border-r-[1px] 
                border-color-border-primary rounded-tr-md"
              >
                <div className="flex items-center gap-2">
                  <span className="uppercase">Enabled</span>
                  <span data-tooltip-id="enabled">
                    <InfoIcon className="w-[18px] h-[18px]" />
                  </span>
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
        )}
        <tbody className="">
          {apps.map((app, index) => {
            return (
              <tr
                className="h-14 [&>*]:border-b-[1px] 
                [&>*]:border-color-border-primary text-sm"
                key={index}
              >
                <td
                  className={`px-2 pl-4 border-l-[1px] 
                  border-color-border-primary cursor-pointer
                  ${isLastElement(apps, index) && "rounded-bl-md"}`}
                  onClick={() => navigateToAppPage(app.id)}
                >
                  {app.name}
                </td>
                <td
                  className="px-2 cursor-pointer"
                  onClick={() => navigateToAppPage(app.id)}
                >
                  {truncateString(app.url, 50)}
                </td>
                <td
                  className="px-2 cursor-pointer"
                  onClick={() => navigateToAppPage(app.id)}
                >
                  {showLastRequest(app) && <LastRequestItem app={app} />}
                  {!showLastRequest(app) && (
                    <span className="font-semibold">N/A</span>
                  )}
                </td>
                <td
                  className="px-2 cursor-pointer"
                  onClick={() => navigateToAppPage(app.id)}
                >
                  <NextRequestTime appId={app.id} />
                </td>
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
