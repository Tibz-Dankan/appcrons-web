"use client";

import React from "react";
import { PostApp } from "@/app/app/postApp";
import { SearchApps } from "@/app/app/searchApps";

const Dashboard = () => {
  return (
    <div className="w-full min-h-[90vh]">
      <PostApp />
      <SearchApps onSuccess={() => {}} />
    </div>
  );
};

export default Dashboard;
