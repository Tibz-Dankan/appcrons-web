"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeController } from "@/app/shared/ThemeController";
import { Link } from "@/lib/router-events";
import { DocumentIcon } from "@/app/shared/Icons/DocumentIcon";
import { MobileNavMenu } from "@/app/home/MobileNavMenu";
import { TAuth } from "@/types/auth";
import { useIsClient } from "@/hooks/UseIsClient";

export const NavBar: React.FC = () => {
  const pathname = usePathname();
  const isClient = useIsClient();
  let isLoggedIn: boolean = false;

  if (isClient) {
    const strAuthData = localStorage.getItem("session");
    const parsedAuthData: TAuth = strAuthData && JSON.parse(strAuthData);
    isLoggedIn = !!parsedAuthData?.accessToken;
  }

  const isDocsPath = pathname.startsWith("/docs");

  return (
    <nav
      className="w-full flex items-center justify-center 
      border-b-[1px] border-color-border-primary
      bg-color-bg-primary fixed top-0 left-0 z-[100]"
    >
      <div
        className="flex items-center justify-between 
         py-4 px-4 sm:px-8 lg:px-8 w-full  max-w-[1280px]"
      >
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/logo.png" width={40} height={40} alt="logo" />
            <span
              className="text-color-text-primary 
              font-[500] text-2xl"
            >
              Appcrons
            </span>
          </Link>
        </div>

        <div className="md:hidden">
          <MobileNavMenu />
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/docs"
            className={`flex items-center justify-center gap-2
             rounded-md p-1 px-3 ${
               isDocsPath &&
               `bg-header-tab-bg px-2 py-[6px] rounded-md text-center
              text-primary`
             }
             text-color-text-primary hover:text-primary focus:text-primary`}
          >
            <DocumentIcon className="text-inherit" />
            <span className="text-inherit">Docs</span>
          </Link>

          <ThemeController />
          {!isLoggedIn && (
            <div className="flex items-center justify-center gap-2">
              <Link
                href="/auth/login"
                className={`py-1 px-3 border-[1px] border-color-border-primary
                rounded-md hover:text-primary focus:text-primary`}
              >
                <span>Log In</span>
              </Link>
              <Link
                href="/auth/signup"
                className={`py-1 px-3 border-[1px]s border-color-border-primary
                 rounded-md bg-primary text-gray-50 hover:bg-primary-light
                 focus:text-primary-light`}
              >
                <span>Sign Up</span>
              </Link>
            </div>
          )}
          {isLoggedIn && (
            <div className="flex items-center justify-center gap-2">
              <Link
                href="/dashboard"
                className={`py-1 px-3 border-[1px] border-color-border-primary
                rounded-md hover:text-primary focus:text-primary`}
              >
                <span>Dashboard</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
