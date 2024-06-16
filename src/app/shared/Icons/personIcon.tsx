import React from "react";
import { twMerge } from "tailwind-merge";

interface PersonIconProps {
  className?: string;
}

export const PersonIcon: React.FC<PersonIconProps> = (props) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        width="20px"
        height="20px"
        className={twMerge(`text-color-text-primary`, props.className)}
      >
        <g fill="none" stroke="currentColor" stroke-linecap="round">
          <circle cx="9.5" cy="5.5" r="3" />
          <path d="M15 16.5v-2c0-3.098-2.495-6-5.5-6c-3.006 0-5.5 2.902-5.5 6v2" />
        </g>
      </svg>
    </div>
  );
};
