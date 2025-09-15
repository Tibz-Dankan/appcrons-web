"use client";

import React, { useState } from "react";
import { UserSearchList } from "./UserSearchList";
import { UserList } from "./UserList";

import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks/redux";
import { Spinner } from "@/app/shared/loader/Spinner";
import { TApp } from "@/types/app";
import { Notification } from "@/app/shared/Notification";
import { PageAuthWrapper } from "@/app/auth/PageAuthWrapper";
import { useSearchParams } from "next/navigation";
import { AdminService } from "@/services/admin.service";
import { SearchUsers } from "./SearchUsers";
import { TUserAPIData } from "@/types/admin";
import { Statistics } from "../Statistics";

const Users: React.FC = () => {
  const [userSearchResults, setUserSearchResults] = useState<TApp[]>([]);
  const [hasSearchCompleted, setHasSearchCompleted] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query")!;
  const [hasSearchQuery, setHasSearchQuery] = useState<boolean>(!!searchQuery);

  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["all-users"],
    queryFn: () =>
      new AdminService().getAllUsers({
        accessToken: accessToken,
        limit: 25,
        cursor: "",
      }),
  });

  const users: TUserAPIData[] = data?.data ?? [];

  const onSearchSuccessHandler = (users: any[]) => {
    setUserSearchResults(() => users);
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

  if (data?.data?.length === 0) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center">
        <span>No users on Appcrons yet!</span>
      </div>
    );
  }

  const showAppList: boolean = !hasSearchCompleted;
  const showSearchResults: boolean = hasSearchCompleted;

  return (
    <div className="w-full min-h-[90vh] flex items-start justify-center">
      <div
        className="w-full px-4 md:px-8 pt-2 max-w-[1280px] mt-8 space-y-12
        overflow-x-hidden"
      >
        <div className="w-full mt-4">
          <Statistics />
        </div>
        <SearchUsers
          onSuccess={onSearchSuccessHandler}
          onQueryValue={onQueryValueHandler}
        />
        {showSearchResults && (
          <UserSearchList users={[]} onClose={onSearchResultCloseHandler} />
        )}
        {showAppList && <UserList users={users} />}
      </div>
    </div>
  );
};

export default PageAuthWrapper(Users);
