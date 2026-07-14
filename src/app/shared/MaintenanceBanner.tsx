"use client";

import React from "react";
import { useAppSelector } from "@/hooks/redux";
import { WarningIcon } from "@/app/shared/Icons/WarningIcon";

export const MaintenanceBanner: React.FC = () => {
  const maintenance = useAppSelector((state) => state.maintenance);

  if (!maintenance.active) return null;

  return (
    <div
      className="w-full h-10 fixed top-0 left-0 z-[110] flex items-center
      justify-center gap-2 bg-warning border-b-[1px] border-warning px-4"
    >
      <WarningIcon className="text-white shrink-0" />
      <span className="text-white text-sm text-center">
        {maintenance.message}
      </span>
    </div>
  );
};
