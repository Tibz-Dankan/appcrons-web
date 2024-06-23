"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeController } from "@/app/shared/themeController";
import { CurrentUser } from "@/app/shared/currentUser";
import { useAppSelector } from "@/hooks/redux";
import Link from "next/link";
import { DashboardIcon } from "@/app/shared/Icons/dashboardIcon";
import { DocumentIcon } from "@/app/shared/Icons/documentIcon";
import { PostAppLayout } from "@/app/app/postAppLayout";
import { AppLink } from "@/app/shared/AppLink";

export const Header: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => !!state.auth.accessToken);
  const pathname = usePathname();

  const isDashboardPath = pathname.startsWith("/dashboard");
  const isDocsPath = pathname.startsWith("/docs");

  return (
    <>
      {isLoggedIn && (
        <header
          className="w-full flex items-center justify-between 
          p-4 border-b-[1px] border-color-border-primary
          bg-color-bg-tertiary"
        >
          <div className="flex items-center gap-2">
            <Image src="/logo.png" width={40} height={40} alt="logo" />
            <span
              className="text-color-text-primary 
              font-semibold"
            >
              AppCrons
            </span>
          </div>
          <div
            className="flex items-center justify-center gap-2 border-[1px]
             border-color-border-primary rounded-md p-1"
          >
            <div>
              <AppLink
                href="/dashboard"
                className={`flex items-center justify-center gap-2
                rounded-md p-1 px-3 ${isDashboardPath && "bg-header-tab-bg"}`}
              >
                <DashboardIcon className="text-header-tab-text" />
                <span>Dashboard</span>
              </AppLink>
              {/* <Link
                href="/dashboard"
                className={`flex items-center justify-center gap-2
                rounded-md p-1 px-3 ${isDashboardPath && "bg-header-tab-bg"}`}
              >
                <DashboardIcon className="text-header-tab-text" />
                <span>Dashboard</span>
              </Link> */}
            </div>
            <div>
              <AppLink
                href="/docs"
                className={`flex items-center justify-center gap-2
                 rounded-md p-1 px-3 ${isDocsPath && "bg-header-tab-bg"}`}
              >
                <DocumentIcon className="text-header-tab-text" />
                <span>Docs</span>
              </AppLink>

              {/* <Link
                href="/docs"
                className={`flex items-center justify-center gap-2
                 rounded-md p-1 px-3 ${isDocsPath && "bg-header-tab-bg"}`}
              >
                <DocumentIcon className="text-header-tab-text" />
                <span>Docs</span>
              </Link> */}
            </div>
            <div>
              {/* <Modal
                openModalElement={
                  <Button
                    type="button"
                    label={
                      <div className="flex items-center justify-center gap-2">
                        <PlusIcon className="text-gray-200 h-6 w-6" />
                        <span>New</span>
                      </div>
                    }
                    className="h-auto py-1 px-3"
                  />
                }
              >
                <PostApp onPost={() => {}} />
              </Modal> */}
              <PostAppLayout />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeController />
            <CurrentUser />
          </div>
        </header>
      )}
    </>
  );
};
