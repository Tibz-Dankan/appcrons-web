import React from "react";
import Image from "next/image";
import { ThemeController } from "@/app/shared/themeController";
import { CurrentUser } from "@/app/shared/currentUser";

export const Header: React.FC = () => {
  return (
    <header
      className="w-full flex items-center justify-between 
      p-4 bg-color-3 border-b-[1px] border-color-3"
    >
      <div className="flex items-center gap-2">
        <Image src="/logo.png" width={40} height={40} alt="logo" />
        <span className="text-color-1 font-semibold">AppCrons</span>
      </div>
      <div className="flex items-center gap-4">
        {/* <div>Theme Controller</div> */}
        <ThemeController />
        <CurrentUser />
      </div>
    </header>
  );
};
