"use client";
import { getFirstLetter } from "@/utils/getFirstLetter";
import React from "react";
import { NavDropDown } from "@/app/shared/NavDropDown";
import { ChevronDownIcon } from "@/app/shared/Icons/ChevronDownIcon";
import { truncateString } from "@/utils/truncateString";
import { useAppSelector } from "@/hooks/redux";

export const CurrentUser: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <NavDropDown>
      <div className="flex items-center justify-center gap-2">
        <span
          className="cursor-pointer grid place-items-center bg-gray-300s p-1
           w-8 h-8 rounded-[50%] text-gray-100 first-letter:uppercase
           bg-gradient-to-r from-cyan-700 via-teal-900  to-blue-600
           font-semibold"
        >
          {getFirstLetter(user.name)}
        </span>
        <span className="font-normal text-color-text-primary">
          {truncateString(user.name, 18)}
        </span>
        <ChevronDownIcon className="w-7 h-7" />
      </div>
    </NavDropDown>
  );
};
