"use client";

import React, { useEffect, useState } from "react";
import { SearchApps } from "@/app/app/SearchApps";
import { AppList } from "@/app/app/AppList";
import { useQuery } from "@tanstack/react-query";
import { AppService } from "@/services/app.service";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Spinner } from "@/app/shared/loader/Spinner";
import { TApp } from "@/types/app";
import { updateApps } from "@/store/actions/app";
import { Notification } from "@/app/shared/Notification";
import { Welcome } from "@/app/app/Welcome";
import { PageAuthWrapper } from "@/app/auth/PageAuthWrapper";

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
      <div className="w-full min-h-[80vh] flex items-center justify-center">
        <Welcome />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center">
      <div className="w-full px-10 max-w-[1280px] mt-14 space-y-12">
        <SearchApps onSuccess={onPostAppHandler} />
        <AppList />
      </div>
    </div>
  );
};

export default PageAuthWrapper(Dashboard);
