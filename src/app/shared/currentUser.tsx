import { Session } from "@/lib/session";
import { getFirstLetter } from "@/utils/getFirstLetter";
import React from "react";
import { NavDropDown } from "@/app/shared/navDropDown";
import { ChevronDownIcon } from "@/app/shared/Icons/chevronDownIcon";
import { truncateString } from "@/utils/truncateString";

export const CurrentUser: React.FC = () => {
  const session = new Session().get();
  if (!session) {
    return <span>No User</span>;
  }

  const user = session.user;
  return (
    <NavDropDown>
      <div className="flex items-center justify-center gap-2">
        <span
          className="cursor-pointer grid place-items-center bg-gray-300s p-1
           w-10s h-10s w-8 h-8 rounded-[50%] text-gray-100 first-letter:uppercase text-xls 
           bg-gradient-to-r from-cyan-700 via-teal-900  to-blue-600
           font-semibold"
        >
          {getFirstLetter(user.name)}
        </span>
        <span className="font-normal text-color-text-primary">
          {truncateString(user.name, 18)}
        </span>
        <ChevronDownIcon />
      </div>
    </NavDropDown>
  );
};
