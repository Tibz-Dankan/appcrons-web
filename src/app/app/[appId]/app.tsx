"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { RequestTimeRangeCard } from "@/app/request/requestTimeRangeCard";
import { PostRequestTimeRange } from "@/app/request/postRequestTimeRange";
import { RequestList } from "@/app/request/requestList";
import { DeleteApp } from "@/app/app/deleteApp";
import { useParams } from "next/navigation";
import { AppService } from "@/services/app.service";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Spinner } from "@/app/shared/loader/spinner";
import { TApp } from "@/types/app";
import { UpdateApp } from "@/app/app/updateApp";
import { PageAuthWrapper } from "@/app/auth/pageAuthWrapper";
import { Modal } from "@/app/shared/modal";
import { EnableDisableAppCard } from "@/app/app/enableDisableAppCard";
import { UpdateAppCard } from "@/app/app/updateAppCard";
import { addOneApp } from "@/store/actions/app";
import Button from "@/app/shared/button";
import { EditIcon } from "@/app/shared/Icons/editIcon";
import { PokecogIcon } from "@/app/shared/Icons/pokecogIcon";
import { Notification } from "@/app/shared/notification";
import { InfoIcon } from "@/app/shared/Icons/infoIcon";
import { LastRequestItem } from "@/app/request/lastRequestItem";
import { convertMillisecondsToSeconds } from "@/utils/convertMillisecondsToSeconds";
import { CheckFilledIcon } from "@/app/shared/Icons/checkFilledIcon";
import { ErrorIconFilled } from "@/app/shared/Icons/errorFilledIcon";
import { getStatusCodeLabel } from "@/utils/getStatusCodeLabel";
import { NextRequestTime } from "@/app/request/nextRequestTime";

const App: React.FC = () => {
  const [app, setApp] = useState<TApp>();
  const appId = useParams()["appId"] as string;
  const [isClosedModal, setIsClosedModal] = useState(false);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const onUpdateAppHandler = (app: TApp) => {
    setApp(() => app);
  };

  const getStatusCodeIcon = (statusCode: number): ReactNode => {
    const code = statusCode.toString();

    const isSuccessCode = code.startsWith("2");
    const isErrorCode = code.startsWith("4") || code.startsWith("5");

    if (isSuccessCode)
      return <CheckFilledIcon className="text-success w-[18px] h-[18px]" />;
    if (isErrorCode) return <ErrorIconFilled className="text-error" />;
  };

  const modalCloseHandler = (close: boolean) => {
    setIsClosedModal(() => close);
  };

  // Update 'isClosedModal' to it's default
  // value 'false' After 1 second
  useEffect(() => {
    if (!isClosedModal) return;
    const timeoutId = setTimeout(() => {
      setIsClosedModal(() => false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isClosedModal]);

  const showRequestTimesRange = (app: TApp): boolean => {
    const hasNoRequestTimes = app.requestTimes.length === 0;
    if (hasNoRequestTimes) return false;
    return true;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`app-${appId}`],
    queryFn: () =>
      new AppService().get({ appId: appId, accessToken: accessToken }),
  });

  useEffect(() => {
    const updateApplicationHandler = () => {
      if (!data) return;

      setApp(() => data.data.app);
      dispatch(addOneApp({ app: data.data.app }));
    };
    updateApplicationHandler();
  }, [data]);

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

  if (!app) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center">
        <span className="text-xl">No Application Details</span>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-8 text-sm">
      <div
        className="flex items-start justify-between gap-4
         border-b-[1px] border-color-border-primary pb-8"
      >
        <div
          className="flex flex-col items-start justify-center
           border-[1px] border-color-border-primary p-8 rounded-md"
        >
          <div className="w-40 flex items-center justify-between gap-4">
            <p className="flex items-center gap-2">
              <PokecogIcon className="text-color-text-secondary" />
              <span className="text-sm uppercase">Application</span>
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2 mt-2">
            <p className="text-xl font-semibold">{app.name}</p>
            <p>
              <Link
                href={`${app.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {app.url}
              </Link>
            </p>
            <p>
              <span className="mr-2">Request Interval:</span>
              <span>{app.requestInterval} minutes</span>
            </p>
          </div>
        </div>
        <div
          className="flex flex-col items-start justify-center gap-0
           border-[1px] border-color-border-primary  rounded-md"
        >
          <div
            className="w-full flex items-center justify-start gap-2
             px-8 text-base bg-color-bg-secondary rounded-t-md py-2
             border-b-[1px] border-color-border-primary"
          >
            <InfoIcon className="text-color-text-secondarys" />
            <span>Last Request Info</span>
          </div>
          <div
            className="w-full flex items-center justify-start gap-2
             px-8 bg-green-500s h-10 mt-1s"
          >
            <span className="mr-4">Made:</span>
            <LastRequestItem app={app} />
          </div>
          <div
            className="w-full flex items-center justify-start gap-2
             px-8"
          >
            <span>Latency:</span>
            <span>
              {convertMillisecondsToSeconds(app.requests[0].duration)}s
            </span>
            <InfoIcon className="text-color-text-secondary" />
          </div>
          <div
            className="w-full flex items-center justify-start gap-2
             px-8 mt-2"
          >
            <span className="mr-2">Status:</span>
            <span>{getStatusCodeIcon(app.requests[0].statusCode)}</span>
            <span>{app.requests[0].statusCode}</span>
            <span>{getStatusCodeLabel(app.requests[0].statusCode)}</span>
          </div>
          <div
            className="w-full flex items-center justify-start gap-2
             px-8 mt-2 border-t-[1px] border-color-border-primary py-2"
          >
            <span>Next Request:</span>
            <NextRequestTime appId={app.id} />
          </div>
        </div>

        <div>
          <div
            className="w-52 border-[1px] border-color-border-primary 
             rounded-md p-4 flex flex-col gap-4"
          >
            <p className="text-sm text-color-text-secondary">
              Add new request time frame for the app
            </p>
            <Modal
              openModalElement={
                <Button label={"New"} type={"button"} className="w-full" />
              }
              closed={isClosedModal}
            >
              <PostRequestTimeRange app={app} onSuccess={modalCloseHandler} />
            </Modal>
          </div>
        </div>
      </div>
      {/* TODO: To modify the RequestTimeRangeCard styles */}
      <div>
        {showRequestTimesRange(app) && <RequestTimeRangeCard app={app} />}
      </div>

      <div className="space-y-8">
        <RequestList appId={app.id} />
        <UpdateAppCard app={app} />
        <EnableDisableAppCard app={app} />
        <DeleteApp app={app} />
      </div>
    </div>
  );
};

export default PageAuthWrapper(App);
