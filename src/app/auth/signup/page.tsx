import React from "react";
import { Metadata } from "next";
import { SignUp } from "@/app/auth/signup/Signup";

export const metadata: Metadata = {
  title: "Sign up - Lets create your appcrons account",
  description: "create your appcrons account",
};

const Page: React.FC = () => {
  return <SignUp />;
};

export default Page;
