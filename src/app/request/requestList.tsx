import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "@/utils/getAccessToken";
import { useAppDispatch } from "@/hooks/redux";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { RequestService } from "@/services/request.service";
import { TRequest } from "@/types/app";
import { Spinner } from "../shared/loader/spinner";
import { AppDate } from "@/utils/date";

interface RequestListProps {
  appId: string;
}

export const RequestList: React.FC<RequestListProps> = (props) => {
  const dispatch = useAppDispatch();
  const accessToken = getAccessToken();

  const appId = props.appId;
  console.log("appId :", appId);

  const { isPending, error, data } = useQuery({
    queryKey: [`app-requests-${appId}`],
    queryFn: () =>
      new RequestService().getByApp({ appId: appId, accessToken: accessToken }),
  });

  useEffect(() => {
    if (!error) return;

    dispatch(showCardNotification({ type: "error", message: error.message }));
    setTimeout(() => {
      dispatch(hideCardNotification());
    }, 5000);
  }, [error]);

  const requests: TRequest[] = data && data.data.requests;

  const isLastElement = (list: any[], index: number): boolean => {
    return index === list.length - 1;
  };

  const requestMadeAt = (date: Date | string): string => {
    return new AppDate(date).dateTime();
  };

  return (
    <div className="p-4">
      {isPending && (
        <div className="w-full grid place-items-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}
      {requests && (
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
                Made at
              </th>
              <th className="px-2 py-4 text-start">Status code</th>
              <th
                className="px-2 py-4 text-start border-r-[1px] 
              border-color-border-primary rounded-tr-md"
              >
                Duration
              </th>
            </tr>
          </thead>
          <tbody className="">
            {requests.map((request, index) => {
              return (
                <tr
                  className="h-14 [&>*]:border-b-[1px] 
                   [&>*]:border-color-border-primary text-sm"
                  key={index}
                >
                  <td
                    className={`px-2 pl-4 border-l-[1px] border-color-border-primary
                     ${isLastElement(requests, index) && "rounded-bl-md"}`}
                  >
                    {requestMadeAt(request.startedAt)}
                  </td>
                  <td className="px-2">{request.statusCode}</td>
                  <td
                    className={`px-2 border-r-[1px] border-color-border-primary
                     ${isLastElement(requests, index) && "rounded-br-md"}`}
                  >
                    {request.duration} ms
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
