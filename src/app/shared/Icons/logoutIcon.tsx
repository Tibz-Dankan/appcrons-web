import React from "react";
import { twMerge } from "tailwind-merge";

interface LogoutIconProps {
  className?: string;
}

export const LogoutIcon: React.FC<LogoutIconProps> = (props) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20px"
        height="20px"
        viewBox="0 0 32 32"
        className={twMerge(`text-color-text-primary`, props.className)}
      >
        <path
          fill="currentColor"
          d="M6 30h12a2 2 0 0 0 2-2v-3h-2v3H6V4h12v3h2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2"
        />
        <path
          fill="currentColor"
          d="M20.586 20.586L24.172 17H10v-2h14.172l-3.586-3.586L22 10l6 6l-6 6z"
        />
      </svg>
    </div>
  );
};
