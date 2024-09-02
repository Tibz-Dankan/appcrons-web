import React from "react";
import { Metadata } from "next";
import Dashboard from "@/app/dashboard/Dashboard";
import { DashboardLayout } from "@/app/layouts/DashboardLayout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Displays a summary of user's applications on appcrons",
};

const Page: React.FC = () => {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
};

export default Page;
