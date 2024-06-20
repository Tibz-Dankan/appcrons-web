import React from "react";
import { twMerge } from "tailwind-merge";

interface PlusIconProps {
  className?: string;
}

export const PlusIcon: React.FC<PlusIconProps> = (props) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 0 16 16"
        width="20px"
        className={twMerge(`text-color-text-primary`, props.className)}
      >
        <path
          fill="currentColor"
          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
        />
      </svg>
    </div>
  );
};
