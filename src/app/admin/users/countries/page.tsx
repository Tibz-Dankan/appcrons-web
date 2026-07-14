import React from "react";
import { Metadata } from "next";
import { DashboardLayout } from "@/app/layouts/DashboardLayout";
import Countries from "./Countries";

export const metadata: Metadata = {
  title: "User Country Distribution",
  description: "Displays the distribution of appcrons' users by country",
};

const Page: React.FC = () => {
  return (
    <DashboardLayout>
      <Countries />
    </DashboardLayout>
  );
};

export default Page;
