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

const Dashboard: React.FC = () => {
  const [apps, setApps] = useState<TApp[]>([]);
  const [isPosted, setIsPosted] = useState<boolean>(false);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const userId = useAppSelector((state) => state.auth.user.id);

  const dispatch = useAppDispatch();

  const { isLoading } = useQuery({
    queryKey: [`apps-${userId}`],
    queryFn: () =>
      new AppService().getByUser({ userId: userId, accessToken: accessToken }),
    onSuccess: (response) => {
      setApps(() => response.data.apps);
      dispatch(updateApps({ apps: response.data.apps }));
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const onPostAppHandler = (app: TApp) => {
    setIsPosted(() => true);
  };

  // Trigger component re-render to update appList
  useEffect(() => {}, [apps, setApps, isPosted]);

  return (
    <div className="w-full min-h-[90vh]">
      <div className="mt-8">
        <SearchApps onSuccess={onPostAppHandler} />
      </div>
      {/*TODO: Temporary Loading spinner (To be removed)  */}
      {isLoading && (
        <div className="w-full grid place-items-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}
      {apps[0] && <AppList />}
    </div>
  );
};

export default PageAuthWrapper(Dashboard);
