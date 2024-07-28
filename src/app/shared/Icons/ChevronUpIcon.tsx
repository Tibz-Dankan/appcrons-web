import React from "react";
import { twMerge } from "tailwind-merge";

interface ChevronUpIconProps {
  className?: string;
}

export const ChevronUpIcon: React.FC<ChevronUpIconProps> = (props) => {
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
          d="M33.3 28.7L25 20.4l-8.3 8.3l-1.4-1.4l9.7-9.7l9.7 9.7z"
        />
      </svg>
    </div>
  );
};
