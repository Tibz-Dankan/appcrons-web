import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RequestService } from "@/services/request.service";
import { TRequest } from "@/types/app";
import { Spinner } from "@/app/shared/loader/Spinner";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/lib/router-events";
import Button from "@/app/shared/Button";
import { ArrowForwardIcon } from "@/app/shared/Icons/ArrowForwardIcon";
import { ArrowBackIcon } from "@/app/shared/Icons/ArrowBackIcon";
import { Notification } from "@/app/shared/Notification";
import { RequestTable } from "@/app/request/RequestTable";
import { RequestLineChart } from "@/app/request/RequestLineChart";
import { InfoIcon } from "@/app/shared/Icons/InfoIcon";
import { updateRequestList, clearRequestList } from "@/store/actions/request";

interface RequestListProps {
  appId: string;
  // TODO: last request as permanently and include it as a prop
}

export const RequestList: React.FC<RequestListProps> = (props) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const searchParams = useSearchParams();
  const [disableNextHandler, setDisableNextHandler] = useState(false);
  const [disablePrevHandler, setDisablePrevHandler] = useState(false);

  const before = searchParams.get("before") ? searchParams.get("before")! : "";
  const page = searchParams.get("page") ? searchParams.get("page")! : "";

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

  useEffect(() => {
    const updateRequestListHandler = () => {
      if (!data) return;

      dispatch(updateRequestList({ appId: appId, requests: requests }));
    };
    updateRequestListHandler();

    return () => dispatch(clearRequestList());
  }, [data, dispatch]);

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

  if (!data || requests.length === 0) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center">
        <span className="text-base">
          This is application hasn't received requests for the past 12 hours{" "}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-start -mb-6">
        <p className="text-base">Request History</p>
      </div>
      <div
        className="flex items-center justify-start gap-2 p-4 
        rounded-md bg-[#0ca678]/[0.3]"
      >
        <span className="w-5 h-5">
          <InfoIcon />
        </span>
        <span>
          For every application, only the request history from the past 12 hours
          is retained.
        </span>
      </div>
      <div
        className="w-full flex flex-col items-center justify-end
         lg:flex-row lg:items-end lg:justify-center gap-8"
      >
        <RequestTable requests={requests} />
        <RequestLineChart requests={requests} />
      </div>
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
