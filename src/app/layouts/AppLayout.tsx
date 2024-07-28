import { Session } from "@/lib/session";
import React, { ReactNode } from "react";
import { Header } from "@/app/layouts/Header";
import { Footer } from "@/app/layouts/Footer";
import { AuthenticateClient } from "@/app/auth/Index";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const session = new Session().get();

  if (!session) {
    return <>{props.children}</>;
  }

  return (
    <div className="w-full">
      <AuthenticateClient session={session} />
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
