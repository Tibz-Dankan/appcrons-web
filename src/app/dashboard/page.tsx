import React from "react";
import { Metadata } from "next";
import Dashboard from "@/app/dashboard/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Displays a summary of user's applications on appcrons",
};

const Page: React.FC = () => {
  return <Dashboard />;
};

export default Page;
