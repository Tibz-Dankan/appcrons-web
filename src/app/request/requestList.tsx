import React from "react";
import { TApp } from "@/types/app";
import { elapsedTime } from "@/utils/elapsedTime";
import { truncateString } from "@/utils/truncateString";
import appList from "@/app/app/data/apps.json";

interface RequestListProps {
  appId: string;
}

export const RequestList: React.FC<RequestListProps> = (props) => {
  // TODO: to make an api call to fetch requests paginated based on the appId
  const apps = appList.apps;

  const isLastElement = (list: any[], index: number): boolean => {
    return index === list.length - 1;
  };
  return (
    <div className="p-4">
      <table
        className="border-separate border-spacing-0 
       w-full overflow-x-auto"
      >
        {/* <caption className=""></caption> */}
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
        <tbody className="">
          {apps.map((app, index) => {
            return (
              <tr
                className="h-14 [&>*]:border-b-[1px] 
              [&>*]:border-color-border-primary text-sm"
                key={index}
              >
                <td
                  className={`px-2 pl-4 border-l-[1px] border-color-border-primary
                ${isLastElement(apps, index) && "rounded-bl-md"}`}
                >
                  {app.name}
                </td>
                <td className="px-2">{truncateString(app.url, 50)}</td>
                <td className="px-2">
                  {elapsedTime(app.requests[0].startedAt)}
                </td>
                <td
                  className={`px-2 border-r-[1px] border-color-border-primary
                ${isLastElement(apps, index) && "rounded-br-md"}`}
                >
                  {app.isDisabled}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
