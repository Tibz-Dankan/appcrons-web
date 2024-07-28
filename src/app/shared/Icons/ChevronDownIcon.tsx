import React from "react";
import { twMerge } from "tailwind-merge";

interface ChevronDownIconProps {
  className?: string;
}

export const ChevronDownIcon: React.FC<ChevronDownIconProps> = (props) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20px"
        height="20px"
        viewBox="0 0 50 50"
        className={twMerge(`text-color-text-primary`, props.className)}
      >
        <path
          fill="currentColor"
          d="m25 32.4l-9.7-9.7l1.4-1.4l8.3 8.3l8.3-8.3l1.4 1.4z"
        />
      </svg>
    </div>
  );
};
