"use client";
import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { GiPokecog } from "react-icons/gi";
import Link from "next/link";
import { RequestTimeRangeCard } from "@/app/request/requestTimeRangeCard";
import { PostRequestTimeRange } from "@/app/request/postRequestTimeRange";
import { RequestList } from "@/app/request/requestList";
import { DeleteApp } from "@/app/app/deleteApp";
import { useParams } from "next/navigation";
import { AppService } from "@/services/app.service";
import { useQuery } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Spinner } from "@/app/shared/loader/spinner";
import { TApp } from "@/types/app";
import { UpdateApp } from "../updateApp";
import { PageAuthWrapper } from "@/app/auth/pageAuthWrapper";
import { Modal } from "@/app/shared/modal";
import { EnableDisableAppCard } from "@/app/app/enableDisableAppCard";
import { UpdateAppCard } from "@/app/app/updateAppCard";
import { addOneApp } from "@/store/actions/app";
import Button from "@/app/shared/button";
import { EditIcon } from "@/app/shared/Icons/editIcon";

const MyApp: React.FC = () => {
  // TODO: To dynamically change the icon color basing on the theme
  // TODO: To apply the application name in the favicon
  const [app, setApp] = useState<TApp>();
  const appId = useParams()["appId"] as string;
  const [isClosedModal, setIsClosedModal] = useState(false);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const { isLoading, data } = useQuery({
    queryKey: [`app-${appId}`],
    queryFn: () =>
      new AppService().get({ appId: appId, accessToken: accessToken }),
    onSuccess: (response) => {
      setApp(() => response.data.app);
      dispatch(addOneApp({ app: response.data.app }));
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const onUpdateAppHandler = (app: TApp) => {
    setApp(() => app);
  };

  const modalCloseHandler = (close: boolean) => {
    setIsClosedModal(() => close);
  };

  // Update 'isClosedModal' to it's default
  // value 'false' After 1 second
  useEffect(() => {
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

  return (
    <div className="p-4 space-y-8 text-sm">
      {isLoading && (
        <div className="w-full grid place-items-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}
      {/* Basic app info */}
      {app && (
        <div
          className="flex items-start justify-between gap-4
           border-b-[1px] border-color-border-primary pb-8"
        >
          <div className="flex flex-col items-start justify-center">
            <div className="w-40 flex items-center justify-between gap-4">
              <p className="flex items-center gap-2">
                <span>
                  <IconContext.Provider
                    value={{
                      size: "1.2rem",
                      color: "#868e96",
                    }}
                  >
                    <GiPokecog />
                  </IconContext.Provider>
                </span>
                <span className="text-sm uppercase">Application</span>
              </p>
              <Modal
                openModalElement={
                  <p className="flex items-center gap-2 cursor-pointer">
                    <EditIcon
                      className="w-[18px] h-[18px] text-color-text-secondary 
                     cursor-pointer"
                    />
                    <span className="text-sm">Update</span>
                  </p>
                }
              >
                <UpdateApp app={app} onUpdate={onUpdateAppHandler} />
              </Modal>
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
              {showRequestTimesRange(app) && <RequestTimeRangeCard app={app} />}
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
      )}
      {/* App Request Time paginated */}
      {app && (
        <div className="space-y-8">
          <RequestList appId={app.id} />
          {/* Update App */}
          <UpdateAppCard app={app} />
          {/* Disable/Enable App */}
          <EnableDisableAppCard app={app} />
          {/* Delete app functionality */}
          <DeleteApp app={app} />
        </div>
      )}
    </div>
  );
};

export default PageAuthWrapper(MyApp);
