import React from "react";
import { Logo } from "@/app/shared/Logo";

export const PageContentLoader = () => {
  return (
    <div
      className="fixed top-0 left-0 w-[100vw] h-[100vh]
       grid place-items-center bg-color-bg-primary"
    >
      <div className="animate-spin">
        <Logo />
      </div>
    </div>
  );
};
