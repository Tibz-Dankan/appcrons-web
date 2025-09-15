"use client";
import React, { useEffect } from "react";
import { RequestTimeRangeCard } from "@/app/request/RequestTimeRangeCard";
import { RequestList } from "@/app/request/RequestList";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Spinner } from "@/app/shared/loader/Spinner";
import { TApp } from "@/types/app";
import { PageAuthWrapper } from "@/app/auth/PageAuthWrapper";
import { addOneApp } from "@/store/actions/app";
import { Notification } from "@/app/shared/Notification";
import { AppLastRequestDetailsCard } from "@/app/app/AppLastRequestDetailsCard";
import { AppDetailsCard } from "@/app/app/AppDetailsCard";
import { AdminService } from "@/services/admin.service";
import { UserDetailsCard } from "../../../UserDetailsCard";
import { TUserAPIData } from "@/types/admin";

const App: React.FC = () => {
  const appId = useParams()["appId"] as string;
  const userId = useParams()["userId"] as string;

  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const showRequestTimesRange = (app: TApp): boolean => {
    const hasNoRequestTimes = app.requestTimes.length === 0;
    if (hasNoRequestTimes) return false;
    return true;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`app-${userId}-${appId}`],
    queryFn: () =>
      new AdminService().getRequestsByApp({
        userId: userId,
        appId: appId,
        before: "",
        accessToken: accessToken,
      }),
  });

  const user: TUserAPIData = data?.data?.user;

  useEffect(() => {
    const updateApplicationHandler = () => {
      if (!data) return;

      dispatch(addOneApp({ app: data.data.app }));
    };
    updateApplicationHandler();
  }, [data]);

  const app = useAppSelector((state) =>
    state.app.apps.find((app) => app.id === appId)
  )!;

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

  if (!app || !user) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center">
        <span className="text-xl">No Application or User Details</span>
      </div>
    );
  }

  return (
    <div
      className="w-full flex flex-col items-center 
       justify-center text-sm"
    >
      <div className="w-full rounded-md pt-10 px-4 md:px-8 max-w-[1280px]">
        <div
          className="inline-block border-[1px] border-color-border-primary
          rounded-md p-6"
        >
          <UserDetailsCard user={user} />
        </div>
      </div>
      <div
        className="w-full flex flex-col gap-8 lg:flex-row
          lg:items-start py-10 px-4 md:px-8 max-w-[1280px]"
      >
        <AppDetailsCard appId={app.id} />
        <AppLastRequestDetailsCard appId={app.id} />
      </div>

      {showRequestTimesRange(app) && (
        <div className="w-full flex items-center justify-center mb-16">
          <div className="w-full px-4 md:px-8 max-w-[1280px]">
            <div className="">
              <p className="text-base mb-2">Request Time Frames</p>
              <RequestTimeRangeCard app={app} />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8 w-full px-4 md:px-8 max-w-[1280px]">
        <div className="w-full mb-16">
          <RequestList appId={app.id} />
        </div>
      </div>
    </div>
  );
};

export default PageAuthWrapper(App);
