import { Session } from "@/lib/session";
import React, { ReactNode } from "react";
import { DashboardHeader } from "@/app/layouts/DashboardHeader";
import { DashboardFooter } from "@/app/layouts/DashboardFooter";
import { AuthenticateClient } from "@/app/auth/Index";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const session = new Session().get();

  if (!session) {
    return <>{props.children}</>;
  }

  return (
    <div className="w-full">
      <AuthenticateClient session={session} />
      <DashboardHeader />
      <main>{props.children}</main>
      <DashboardFooter />
    </div>
  );
};
