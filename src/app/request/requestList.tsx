import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RequestService } from "@/services/request.service";
import { TRequest } from "@/types/app";
import { Spinner } from "@/app/shared/loader/spinner";
import { AppDate } from "@/utils/date";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/shared/button";
import { ArrowForwardIcon } from "@/app/shared/Icons/arrowForwardIcon";
import { ArrowBackIcon } from "@/app/shared/Icons/arrowBackIcon";
import { Notification } from "@/app/shared/notification";

interface RequestListProps {
  appId: string;
  // TODO: last request as permanently and include it as a prop
}

export const RequestList: React.FC<RequestListProps> = (props) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [disableNextHandler, setDisableNextHandler] = useState(false);
  const [disablePrevHandler, setDisablePrevHandler] = useState(false);

  const before = searchParams.get("before") ? searchParams.get("before")! : "";
  const page = searchParams.get("page") ? searchParams.get("page")! : "";
  console.log("before: ", before);
  console.log("page: ", page);

  const appId = props.appId;

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`app-requests-${appId}-${before}`],
    queryFn: () =>
      new RequestService().getByApp({
        appId: appId,
        before: before,
        accessToken: accessToken,
      }),
  });

  const requests: TRequest[] = data && data.data.requests;
  const appRequestCount: number = data && data.data.count;

  const isLastElement = (list: any[], index: number): boolean => {
    return index === list.length - 1;
  };

  const requestMadeAt = (date: Date | string): string => {
    return new AppDate(date).dateTime();
  };

  const getTotalNumPages = () => Math.ceil(appRequestCount / 10);
  const getCurrentPage = () => (page ? parseInt(page) : 1);

  const nextPageHandler = () => {
    const createdAtBefore = requests[requests.length - 1].createdAt;
    const totalNumPages = getTotalNumPages();
    const currentPage = getCurrentPage();
    const nextPage = currentPage + 1;
    const disabledPrevBtn: boolean = currentPage <= 1;
    const disabledNextBtn: boolean = currentPage >= totalNumPages;

    // Enable next prev btn, disable next btn,
    if (!disabledPrevBtn) {
      setDisablePrevHandler(() => false);
    }
    if (disabledNextBtn) {
      setDisableNextHandler(() => true);
      return;
    }

    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("before", createdAtBefore);
    currentParams.set("page", nextPage.toString());

    router.push(`?page=${nextPage}&before=${createdAtBefore}`);
  };

  const prevPageHandler = () => {
    const currentPage = getCurrentPage();
    const totalNumPages = getTotalNumPages();
    const disabledPrevBtn: boolean = currentPage <= 1;
    const disabledNextBtn: boolean = currentPage >= totalNumPages;

    // Enable next btn, disable prev btn
    if (!disabledNextBtn) {
      setDisableNextHandler(() => false);
    }
    if (disabledPrevBtn) {
      setDisablePrevHandler(() => true);
      return;
    }

    router.back();
  };

  useEffect(() => {
    const updateNavButtonDisabilityHandler = () => {
      const totalNumPages = getTotalNumPages();
      const currentPage = getCurrentPage();
      const disabledPrevBtn: boolean = currentPage <= 1;
      const disabledNextBtn: boolean = currentPage >= totalNumPages;

      // Disable prev btn, enable next btn
      if (disabledPrevBtn) {
        setDisablePrevHandler(() => true);
      } else {
        setDisablePrevHandler(() => false);
      }

      // Disable next btn, enable next prev
      if (disabledNextBtn) {
        setDisableNextHandler(() => true);
      } else {
        setDisableNextHandler(() => false);
      }
    };
    updateNavButtonDisabilityHandler();
  }, [page, before]);

  if (isPending) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Notification
          type={"error"}
          message={error.message}
          onClose={() => {}}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center">
        <span className="text-xl">No requests for application</span>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-8">
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
      <div className="w-full flex items-center justify-end gap-4">
        <Button
          label={
            <div className="flex items-center justify-center gap-2">
              <span>
                <ArrowBackIcon className="text-primary" />
              </span>
              <span>Prev</span>
            </div>
          }
          type={"button"}
          disabled={disablePrevHandler}
          onClick={() => prevPageHandler()}
          className="text-primary font-semibold h-auto
           bg-color-bg-secondary disabled:cursor-not-allowed 
           disabled:opacity-70 border-[1px] border-color-border-primary"
        />
        <p
          className="flex items-center justify-center gap-2
           text-color-text-primary"
        >
          <span>Page</span>
          <span>{getCurrentPage()}</span>
          <span>of</span>
          <span>{getTotalNumPages()}</span>
        </p>
        <Button
          label={
            <div className="flex items-center justify-center gap-2">
              <span>Next</span>
              <span>
                <ArrowForwardIcon className="text-primary" />
              </span>
            </div>
          }
          type={"button"}
          disabled={disableNextHandler}
          onClick={() => nextPageHandler()}
          className="text-primary font-semibold h-auto
           bg-color-bg-secondary disabled:cursor-not-allowed 
           disabled:opacity-70 border-[1px] border-color-border-primary"
        />
      </div>
    </div>
  );
};
