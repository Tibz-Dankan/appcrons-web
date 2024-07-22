"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeController } from "@/app/shared/themeController";
import { Link } from "@/lib/router-events";
import { DocumentIcon } from "@/app/shared/Icons/documentIcon";

export const NavBar: React.FC = () => {
  const pathname = usePathname();

  const isDocsPath = pathname.startsWith("/docs");

  return (
    <nav
      className="w-full flex items-center justify-between 
      p-4 border-b-[1px] border-color-border-primary
      bg-color-bg-primary fixed top-0 left-0 z-[100]"
    >
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/logo.png" width={30} height={30} alt="logo" />
          <span
            className="text-color-text-primary 
            font-[500] text-2xl"
          >
            Appcrons
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/docs"
          className={`flex items-center justify-center gap-2
           rounded-md p-1 px-3 ${isDocsPath && "bg-header-tab-bg"}
           hover:text-primary focus:text-primary`}
        >
          <DocumentIcon
            className="text-header-tab-text hover:text-inherit
            focus:text-inherit"
          />
          <span className="hover:text-inherit focus:text-inherit">Docs</span>
        </Link>

        <ThemeController />
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
    </nav>
  );
};
