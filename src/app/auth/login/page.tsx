import React from "react";
import { Metadata } from "next";
import { LogIn } from "@/app/auth/login/Login";

export const metadata: Metadata = {
  title: "Log into your account",
  description: "Log into your appcrons account",
};

const Page: React.FC = () => {
  return <LogIn />;
};

export default Page;
