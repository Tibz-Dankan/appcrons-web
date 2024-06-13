import React from "react";
import Image from "next/image";
import { ThemeController } from "@/app/shared/themeController";
import { CurrentUser } from "@/app/shared/currentUser";

export const Header: React.FC = () => {
  // TODO: to add link on dashboard pages
  return (
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
      <div className="flex items-center gap-4">
        <ThemeController />
        <CurrentUser />
      </div>
    </header>
  );
};
