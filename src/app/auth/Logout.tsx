import React from "react";
import { LogoutIcon } from "@/app/shared/Icons/LogoutIcon";
import Button from "@/app/shared/Button";

interface LogOutProps {
  onTrigger: (triggered: boolean) => void;
}

export const LogOut: React.FC<LogOutProps> = (props) => {
  return (
    <div
      className={"w-full block px-4 py-2 cursor-pointer"}
      onClick={() => props.onTrigger(true)}
    >
      <Button
        label={
          <div className="flex items-center justify-start gap-4">
            <LogoutIcon />
            <span>Log out</span>
          </div>
        }
        className="bg-transparent h-full text-color-text-primary
         px-0 py-0 text-sm"
        type={"submit"}
      />
    </div>
  );
};
