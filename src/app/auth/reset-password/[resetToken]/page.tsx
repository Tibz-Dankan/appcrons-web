import React from "react";
import { ResetPassword } from "@/app/auth/reset-password/resetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password: Provide a new password for your account",
  description: "Provide a new password for your account",
};

const Page = () => {
  return <ResetPassword />;
};

export default Page;
