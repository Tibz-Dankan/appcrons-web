"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeController } from "@/app/shared/ThemeController";
import { CurrentUser } from "@/app/shared/CurrentUser";
import { useAppSelector } from "@/hooks/redux";
import { Link } from "@/lib/router-events";
import { DashboardIcon } from "@/app/shared/Icons/DashboardIcon";
import { DocumentIcon } from "@/app/shared/Icons/DocumentIcon";
import { PostAppLayout } from "@/app/app/PostAppLayout";

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
             py-4 px-4 md:px-8 max-w-[1280px]"
          >
            <div>
              <Link href="/dashboard" className="flex items-center gap-1">
                <div className="w-10">
                  <Image src="/logo.png" width={40} height={40} alt="logo" />
                </div>
                <span
                  className="text-color-text-primary 
                   font-[500] text-2xl hidden md:block"
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
                  rounded-md py-[6px] md:py-1 px-3 ${
                    isDashboardPath && "bg-header-tab-bg"
                  }`}
                >
                  <DashboardIcon className="text-header-tab-text" />
                  <span className="hidden md:block">Dashboard</span>
                </Link>
              </div>
              <div>
                <Link
                  href="/docs"
                  className={`flex items-center justify-center gap-2
                  rounded-md py-[6px] md:py-1 px-3 ${
                    isDocsPath && "bg-header-tab-bg"
                  }`}
                >
                  <DocumentIcon className="text-header-tab-text" />
                  <span className="hidden md:block">Docs</span>
                </Link>
              </div>
              <div>
                <PostAppLayout />
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <ThemeController />
              <CurrentUser />
            </div>
          </div>
        </header>
      )}
    </>
  );
};
