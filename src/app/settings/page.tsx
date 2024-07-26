import React from "react";
import { Metadata } from "next";
import { Settings } from "@/app/settings/settings";

export const metadata: Metadata = {
  title: "Settings",
  description: "Adjust your account details to your preferences",
};

const Page: React.FC = () => {
  return <Settings />;
};

export default Page;
