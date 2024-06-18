"use client";

import React from "react";
import { TApp } from "@/types/app";
import { truncateString } from "@/utils/truncateString";
import { clientURL } from "@/constants";
import { useRouter } from "next/navigation";
import { LastRequestItem } from "@/app/request/lastRequestItem";
import { EnableDisableApp } from "@/app/app/enableDisableApp";
import { useAppSelector } from "@/hooks/redux";
import { NextRequestTime } from "../request/nextRequestTime";

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
    const isNull: boolean = app.requests === null;
    const haveNoFirstElement = app.requests && app.requests[0] == undefined;

    if (isNull || haveNoFirstElement) return false;
    return true;
  };

  // TODO: to cater for no last request when rendering the progress loader
  return (
    <div className="p-4">
      <table
        className="border-separate border-spacing-0 
         w-full overflow-x-auto"
      >
        {showListHead && (
          <thead>
            <tr
              className="[&>*]:bg-color-bg-secondary [&>*]:border-y-[1px] 
               [&>*]:border-color-border-primary uppercase text-[12px]"
            >
              <th
                className="px-2 pl-4 py-4 text-start border-l-[1px] 
                border-color-border-primary rounded-tl-md"
              >
                Application Name
              </th>
              <th className="px-2 py-4 text-start">URL</th>
              <th className="px-2 py-4 text-start">Last Request</th>
              <th className="px-2 py-4 text-start">Next Request</th>
              <th
                className="px-2 py-4 text-start border-r-[1px] 
                border-color-border-primary rounded-tr-md"
              >
                Enabled
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
