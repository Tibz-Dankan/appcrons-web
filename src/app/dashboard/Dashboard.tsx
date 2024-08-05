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
import { useSearchParams } from "next/navigation";
import { AppSearchResultList } from "../app/AppSearchResultList";

const Dashboard: React.FC = () => {
  const [appSearchResults, setAppSearchResults] = useState<TApp[]>([]);
  const [hasSearchCompleted, setHasSearchCompleted] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query")!;
  const [hasSearchQuery, setHasSearchQuery] = useState<boolean>(!!searchQuery);

  // TODO: To add state for telling whether app search
  // result list to perform query action or not
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const userId = useAppSelector((state) => state.auth.user.id);

  const dispatch = useAppDispatch();

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

  const onSearchSuccessHandler = (apps: TApp[]) => {
    setAppSearchResults(() => apps);
    setHasSearchCompleted(() => true);
  };

  const onQueryValueHandler = (hasQueryValue: boolean) => {
    setHasSearchQuery(() => hasQueryValue);
    if (!hasQueryValue) {
      setHasSearchCompleted(() => false);
    }
  };

  const onSearchResultCloseHandler = (isClosed: boolean) => {
    setHasSearchCompleted(() => !isClosed);
  };

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

  const showAppList: boolean = !hasSearchCompleted;
  const showSearchResults: boolean = hasSearchCompleted;

  console.log("hasSearchQuery:", hasSearchQuery);
  console.log("hasSearchCompleted:", hasSearchCompleted);

  return (
    <div className="w-full min-h-[90vh] flex items-start justify-center">
      <div
        className="w-full px-4 md:px-8 pt-2 max-w-[1280px] mt-8 space-y-12
         overflow-x-hidden"
      >
        <SearchApps
          onSuccess={onSearchSuccessHandler}
          onQueryValue={onQueryValueHandler}
        />
        {showSearchResults && (
          <AppSearchResultList
            apps={appSearchResults}
            onClose={onSearchResultCloseHandler}
          />
        )}
        {showAppList && <AppList />}
      </div>
    </div>
  );
};

export default PageAuthWrapper(Dashboard);
