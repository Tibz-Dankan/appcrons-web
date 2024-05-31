"use client";

import React, { useState } from "react";
import { PostApp } from "@/app/app/postApp";
import { SearchApps } from "@/app/app/searchApps";
import { AppList } from "@/app/app/appList";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "@/utils/getAccessToken";
import { getUserId } from "@/utils/getUserId";
import { AppService } from "@/services/app.service";
import { useAppDispatch } from "@/hooks/redux";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { Spinner } from "@/app/shared/loader/spinner";
import { TApp } from "@/types/app";

const Dashboard = () => {
  const [apps, setApps] = useState<TApp[]>([]);
  const accessToken = getAccessToken();
  const userId = getUserId();
  const dispatch = useAppDispatch();

  const { isLoading, error, data } = useQuery({
    queryKey: [`apps-${userId}`],
    queryFn: () =>
      new AppService().getByUser({ userId: userId, accessToken: accessToken }),
    onSuccess: (response) => {
      setApps(() => response.data.apps);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  return (
    <div className="w-full min-h-[90vh]">
      <PostApp />
      <SearchApps onSuccess={() => {}} />
      {/*TODO: Temporary Loading spinner (To be removed)  */}
      {isLoading && (
        <div className="w-full grid place-items-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}
      {apps[0] && <AppList apps={apps} />}
    </div>
  );
};

export default Dashboard;
