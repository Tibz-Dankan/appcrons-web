import React from "react";
import { Metadata } from "next";
import { DashboardLayout } from "@/app/layouts/DashboardLayout";
import Users from "./Users";

export const metadata: Metadata = {
  title: "Users Dashboard",
  description: "Displays a summary of user's applications on appcrons",
};

const Page: React.FC = () => {
  return (
    <DashboardLayout>
      <Users />
    </DashboardLayout>
  );
};

export default Page;
