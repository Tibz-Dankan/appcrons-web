import React, { useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
// import Button from "../shared/button";

interface RequestListProps {
  appId: string;
}

export const RequestList: React.FC<RequestListProps> = (props) => {
  const dispatch = useAppDispatch();
  const accessToken = getAccessToken();
  const router = useRouter();
  const searchParams = useSearchParams();
  // const [disableNextHandler, setDisableNextHandler] = useState(false);
  // const [disablePrevHandler, setDisablePrevHandler] = useState(true);

  const before = searchParams.get("before") ? searchParams.get("before")! : "";
  console.log("before: ", before);

  const appId = props.appId;
  console.log("appId :", appId);

  const { isLoading, data } = useQuery({
    queryKey: [`app-requests-${appId}-${before}`],
    queryFn: () =>
      new RequestService().getByApp({
        appId: appId,
        before: before,
        accessToken: accessToken,
      }),
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const requests: TRequest[] = data && data.data.requests;

  const isLastElement = (list: any[], index: number): boolean => {
    return index === list.length - 1;
  };

  const requestMadeAt = (date: Date | string): string => {
    return new AppDate(date).dateTime();
  };

  // const loadNextRequestsHandler = () => {
  //   const createdAtBefore = requests[requests.length - 1].createdAt;
  //   const twelveHourMillSec = 12 * 1000 * 60 * 60;
  //   const requestDiffInMillSec =
  //     new Date().getTime() - new Date(createdAtBefore).getTime();

  //   const disabled: boolean = requestDiffInMillSec >= twelveHourMillSec;

  //   if (disabled) {
  //     setDisableNextHandler(() => true);
  //     console.log("next handler disabled::", disabled);
  //     return;
  //   }

  //   const currentParams = new URLSearchParams(searchParams);
  //   currentParams.set("before", createdAtBefore);

  //   router.push(`?before=${createdAtBefore}`);
  // };

  // const loadPrevRequestsHandler = () => {
  //   const createdAtBefore = requests[0].createdAt;
  //   const fiveMinuteMillSec = 5 * 1000 * 60;
  //   const requestDiffInMillSec =
  //     new Date().getTime() - new Date(createdAtBefore).getTime();

  //   // validate next btn
  //   const disabled: boolean = requestDiffInMillSec <= fiveMinuteMillSec;

  //   if (disabled) {
  //     setDisablePrevHandler(() => true);
  //     console.log("prev handler disabled::", disabled);
  //     return;
  //   }

  //   const currentParams = new URLSearchParams(searchParams);
  //   currentParams.set("before", createdAtBefore);

  //   router.push(`?before=${createdAtBefore}`);
  // };

  return (
    <div className="p-4 space-y-8">
      {isLoading && (
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
      {/* {requests && ()}                          */}
      {/* // <div className="w-full flex items-center justify-end gap-2">
        //   <Button
        //     label={"Previous"}
        //     type={"button"}
        //     aria-disabled={disablePrevHandler}
        //     onClick={() => loadPrevRequestsHandler()}
        //   />
        //   <Button
        //     label={"Next"}
        //     type={"button"}
        //     aria-disabled={disableNextHandler}
        //     onClick={() => loadNextRequestsHandler()}
        //   />
        // </div> */}
    </div>
  );
};
