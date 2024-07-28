import React, { ReactNode } from "react";
import { TRequest } from "@/types/app";
import { AppDate } from "@/utils/date";
import { convertMillisecondsToSeconds } from "@/utils/convertMillisecondsToSeconds";
import { CheckFilledIcon } from "@/app/shared/Icons/CheckFilledIcon";
import { ErrorIconFilled } from "@/app/shared/Icons/ErrorFilledIcon";
import { getStatusCodeLabel } from "@/utils/getStatusCodeLabel";

interface RequestTableProps {
  requests: TRequest[];
}

export const RequestTable: React.FC<RequestTableProps> = (props) => {
  const requests: TRequest[] = props.requests;

  const isLastElement = (list: any[], index: number): boolean => {
    return index === list.length - 1;
  };

  const requestMadeAt = (date: Date | string): string => {
    return new AppDate(date).dateTime();
  };

  const getStatusCodeIcon = (statusCode: number): ReactNode => {
    const code = statusCode.toString();

    const isSuccessCode = code.startsWith("2");
    const isErrorCode = code.startsWith("4") || code.startsWith("5");

    if (isSuccessCode)
      return <CheckFilledIcon className="text-success w-[18px] h-[18px]" />;
    if (isErrorCode) return <ErrorIconFilled className="text-error" />;
  };

  return (
    <div className="w-full">
      <table
        className="border-separate border-spacing-0 
         w-full overflow-x-auto"
      >
        <thead>
          <tr
            className="[&>*]:bg-color-bg-secondary [&>*]:border-y-[1px] 
              [&>*]:border-color-border-primary  text-sm"
          >
            <th
              className="px-2 pl-4 py-3 text-start border-l-[1px] 
               border-color-border-primary rounded-tl-md"
            >
              Time
            </th>
            <th className="px-2 py-3 text-start">Status code</th>
            <th
              className="px-2 py-3 text-start border-r-[1px] 
              border-color-border-primary rounded-tr-md"
            >
              Latency
            </th>
          </tr>
        </thead>
        <tbody className="">
          {requests.map((request, index) => {
            return (
              <tr
                className="h-10 [&>*]:border-b-[1px]
                 [&>*]:border-color-border-primary text-sm"
                key={index}
              >
                <td
                  className={`px-2 pl-4 border-l-[1px] border-color-border-primary
                   ${isLastElement(requests, index) && "rounded-bl-md"}`}
                >
                  {requestMadeAt(request.startedAt)}
                </td>
                <td className="px-2">
                  <div className="flex items-center justify-start gap-1">
                    <span>{getStatusCodeIcon(request.statusCode)}</span>
                    <span>{request.statusCode}</span>
                    <span>{getStatusCodeLabel(request.statusCode)}</span>
                  </div>
                </td>
                <td
                  className={`px-2 border-r-[1px] border-color-border-primary
                   ${isLastElement(requests, index) && "rounded-br-md"}`}
                >
                  {convertMillisecondsToSeconds(request.duration)}s
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
