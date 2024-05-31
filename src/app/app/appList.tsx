"use client";

import React from "react";
import { TApp } from "@/types/app";
import { truncateString } from "@/utils/truncateString";
import { ToggleSwitch } from "@/app/shared/toggleSwitch";
import { clientURL } from "@/constants";
import { useRouter } from "next/navigation";
import { LastRequestItem } from "@/app/request/lastRequestItem";

interface AppListProps {
  showListHead?: boolean;
  apps: TApp[];
}

export const AppList: React.FC<AppListProps> = (props) => {
  const showListHead = props.showListHead ? props.showListHead : true;
  const apps = props.apps;
  const router = useRouter();

  const isLastElement = (list: any[], index: number): boolean => {
    return index === list.length - 1;
  };

  const navigateToAppPage = (appId: string) => {
    router.push(`${clientURL}/app/${appId}`);
  };

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
                  <LastRequestItem startedAt={app.requests[0]?.startedAt} />
                </td>
                <td
                  className={`px-2 border-r-[1px] border-color-border-primary
                  ${isLastElement(apps, index) && "rounded-br-md"}`}
                >
                  <ToggleSwitch
                    onCheck={() => {}}
                    checked={!app.isDisabled}
                    checkedIcon={<div />}
                    uncheckedIcon={<div />}
                    offColor={"#adb5bd"}
                    onColor={"#12b886"}
                    offHandleColor={"#495057"}
                    onHandleColor={"#087f5b"}
                    diameter={20}
                    height={12}
                    width={40}
                    className={"-pl-2"}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
