"use client";

import React, { useEffect } from "react";
import { Spinner } from "@/app/shared/loader/Spinner";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { AdminService } from "@/services/admin.service";
import { TUserAPIData } from "@/types/admin";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Notification } from "@/app/shared/Notification";
import { TApp } from "@/types/app";
import { AppCard } from "./AppCard";
import { UserDetailsCard } from "../UserDetailsCard";
import { addOneApp } from "@/store/actions/app";
import { useGetAppsLastRequest } from "@/hooks/UseGetAppsLastRequest";

const UserApps: React.FC = () => {
  const userId = useParams()["userId"] as string;
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();

  useGetAppsLastRequest(userId);

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`user-apps-${userId}`],
    queryFn: () =>
      new AdminService().getAppsByUser({
        userId: userId,
        accessToken: accessToken,
        limit: 25,
        cursor: "",
      }),
  });

  const user: TUserAPIData = data?.data?.user ?? {};
  const apps: TApp[] = data?.data?.apps ?? [];

  useEffect(() => {
    const updateApplicationsHandler = () => {
      if (!apps) return;

      apps.map((app) => {
        dispatch(addOneApp({ app: app }));
      });
    };
    updateApplicationsHandler();
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

  if (data?.data?.apps?.length === 0) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center">
        <span>No users on Appcrons yet!</span>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full space-y-8 mt-12 px-4 md:px-8 max-w-[1280px]">
        {/* User Details */}
        <div
          className="inline-block border-[1px] border-color-border-primary
          rounded-md p-6"
        >
          <UserDetailsCard user={user} />
        </div>

        {/* User Applications */}
        <div className="text-lg">
          <span>Applications</span>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {apps.map((app, index) => (
            <div key={index}>
              <AppCard app={app} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserApps;
