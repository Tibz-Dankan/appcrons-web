"use client";

import React from "react";
import { PostApp } from "@/app/app/postApp";
import { SearchApps } from "@/app/app/searchApps";
import { AppList } from "@/app/app/appList";
import apps from "@/app/app/data/apps.json";

const Dashboard = () => {
  const appList = apps.apps;

  return (
    <div className="w-full min-h-[90vh]">
      <PostApp />
      <SearchApps onSuccess={() => {}} />
      <AppList apps={appList} />
    </div>
  );
};

export default Dashboard;
