import { TApp } from "@/types/app";
import React from "react";

interface AppListProps {
  showListHead?: boolean;
  apps: TApp[];
}

export const AppList: React.FC<AppListProps> = (props) => {
  const showListHead = props.showListHead ? props.showListHead : true;
  const apps = props.apps;

  return (
    <div>
      <table className="border-collapse w-full overflow-x-auto">
        <caption className=""></caption>
        {showListHead && (
          <thead>
            <tr className="bg-green-500 border-t-2 border-primary">
              <th
                className="px-2 py-4 text-gray-50
                   text-start"
              >
                Application Name
              </th>
              <th
                className="px-2 py-4 text-gray-50 
                  text-start"
              >
                Enabled
              </th>
              <th className="px-2 py-4 text-gray-50 text-start">URL</th>
              <th className="px-2 py-4 text-gray-50 text-start">
                Last Request
              </th>
            </tr>
          </thead>
        )}
        <tbody className="text-gray-800">
          {apps.map((app, index) => {
            return (
              <tr className="h-14 border-b-2 border-primaryLight" key={index}>
                <td className="px-2">{app.name}</td>
                <td className="px-2">{app.isDisabled}</td>
                <td className="px-2">{app.url}</td>
                <td className="px-2">{app.requests[0].startedAt}</td>
                <td className="px-2"></td>
              </tr>
            );
          })}
          ;
        </tbody>
      </table>
    </div>
  );
};
