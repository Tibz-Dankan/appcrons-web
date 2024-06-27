import React from "react";
import { twMerge } from "tailwind-merge";

interface DotIconProps {
  className?: string;
}

export const DotIcon: React.FC<DotIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      width="20px"
      viewBox="0 0 24 24"
      className={twMerge(`text-color-text-primary`, props.className)}
    >
      <path
        fill="currentColor"
        d="M12 10a2 2 0 0 0-2 2a2 2 0 0 0 2 2c1.11 0 2-.89 2-2a2 2 0 0 0-2-2"
      />
    </svg>
  );
};
