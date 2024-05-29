"use client";

import React, { useEffect } from "react";
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

const Dashboard = () => {
  const accessToken = getAccessToken();
  const userId = getUserId();
  const dispatch = useAppDispatch();

  const { isPending, error, data } = useQuery({
    queryKey: [`apps-${userId}`],
    queryFn: () =>
      new AppService().getByUser({ userId: userId, accessToken: accessToken }),
  });

  useEffect(() => {
    if (!error) return;

    dispatch(showCardNotification({ type: "error", message: error.message }));
    setTimeout(() => {
      dispatch(hideCardNotification());
    }, 5000);
  }, [error]);

  const apps = data && data.data.apps;

  return (
    <div className="w-full min-h-[90vh]">
      <PostApp />
      <SearchApps onSuccess={() => {}} />
      {/*TODO: Temporary Loading spinner (To be removed)  */}
      {isPending && (
        <div className="w-full grid place-items-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}
      {apps && <AppList apps={apps} />}
    </div>
  );
};

export default Dashboard;
