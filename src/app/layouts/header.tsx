"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeController } from "@/app/shared/themeController";
import { CurrentUser } from "@/app/shared/currentUser";
import { useAppSelector } from "@/hooks/redux";
import { Link } from "@/lib/router-events";
import { DashboardIcon } from "@/app/shared/Icons/dashboardIcon";
import { DocumentIcon } from "@/app/shared/Icons/documentIcon";
import { PostAppLayout } from "@/app/app/postAppLayout";

export const Header: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => !!state.auth.accessToken);
  const pathname = usePathname();

  const isDashboardPath = pathname.startsWith("/dashboard");
  const isDocsPath = pathname.startsWith("/docs");

  return (
    <>
      {isLoggedIn && (
        <header
          className="w-full flex items-center justify-center 
          border-b-[1px] border-color-border-primary
          bg-color-bg-tertiary"
        >
          <div
            className="w-full flex items-center justify-between 
             py-4 px-10 max-w-[1280px]"
          >
            <div>
              <Link href="/dashboard" className="flex items-center gap-1">
                <Image src="/logo.png" width={30} height={30} alt="logo" />
                <span
                  className="text-color-text-primary 
                   font-[500] text-2xl"
                >
                  Appcrons
                </span>
              </Link>
            </div>
            <div
              className="flex items-center justify-center gap-2 border-[1px]
             border-color-border-primary rounded-md p-1"
            >
              <div>
                <Link
                  href="/dashboard"
                  className={`flex items-center justify-center gap-2
                rounded-md p-1 px-3 ${isDashboardPath && "bg-header-tab-bg"}`}
                >
                  <DashboardIcon className="text-header-tab-text" />
                  <span>Dashboard</span>
                </Link>
              </div>
              <div>
                <Link
                  href="/docs"
                  className={`flex items-center justify-center gap-2
                 rounded-md p-1 px-3 ${isDocsPath && "bg-header-tab-bg"}`}
                >
                  <DocumentIcon className="text-header-tab-text" />
                  <span>Docs</span>
                </Link>
              </div>
              <div>
                <PostAppLayout />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeController />
              <CurrentUser />
            </div>
          </div>
        </header>
      )}
    </>
  );
};
