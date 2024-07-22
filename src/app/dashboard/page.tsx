"use client";

import React, { useEffect, useState } from "react";
// import { PostApp } from "@/app/app/postApp";
import { SearchApps } from "@/app/app/searchApps";
import { AppList } from "@/app/app/appList";
import { useQuery } from "@tanstack/react-query";
import { AppService } from "@/services/app.service";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { Spinner } from "@/app/shared/loader/spinner";
import { TApp } from "@/types/app";
import { updateApps } from "@/store/actions/app";
import { PageAuthWrapper } from "@/app/auth/pageAuthWrapper";
import { Notification } from "@/app/shared/notification";

const Dashboard: React.FC = () => {
  const [apps, setApps] = useState<TApp[]>([]);
  const [isPosted, setIsPosted] = useState<boolean>(false);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const userId = useAppSelector((state) => state.auth.user.id);

  const dispatch = useAppDispatch();

  const onPostAppHandler = (app: TApp) => {
    setIsPosted(() => true);
  };

  // Trigger component re-render to update appList
  useEffect(() => {}, [apps, setApps, isPosted]);

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`apps-${userId}`],
    queryFn: () =>
      new AppService().getByUser({ userId: userId, accessToken: accessToken }),
  });

  useEffect(() => {
    const updateUserApplicationsHandler = () => {
      if (!data) return;

      dispatch(updateApps({ apps: data.data.apps }));
    };
    updateUserApplicationsHandler();
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

  if (!data || !data.data.apps) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center">
        {/* TODO: To display action to help user create the first app */}
        <span className="text-xl">No Applications</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[90vh]">
      <div className="mt-8">
        <SearchApps onSuccess={onPostAppHandler} />
      </div>
      <AppList />
    </div>
  );
};

export default PageAuthWrapper(Dashboard);
