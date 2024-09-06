import React from "react";
import { Metadata } from "next";
import Settings from "@/app/settings/Settings";
import { DashboardLayout } from "@/app/layouts/DashboardLayout";

export const metadata: Metadata = {
  title: "Settings",
  description: "Adjust your account details to your preferences",
};

const Page: React.FC = () => {
  return (
    <DashboardLayout>
      <Settings />
    </DashboardLayout>
  );
};

export default Page;
