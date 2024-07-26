import React from "react";
import { Metadata } from "next";
import { ForgotPassword } from "@/app/auth/forgot-password/forgotPassword";

export const metadata: Metadata = {
  title: "Forgot-Password: Let us reset your account password",
  description: "Let us reset your account password",
};

const Page: React.FC = () => {
  return <ForgotPassword />;
};

export default Page;
