import React from "react";
import { twMerge } from "tailwind-merge";

interface TriangleDownIconProps {
  className?: string;
}

export const TriangleDownIcon: React.FC<TriangleDownIconProps> = (
  props: any
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
      height="20px"
      role="presentation"
      width="20px"
      className={twMerge(`text-color-text-secondary`, props.className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M5.214 10.541a.903.903 0 0 0 1.572 0l4.092-7.169C11.226 2.762 10.789 2 10.09 2H1.91c-.698 0-1.135.762-.787 1.372z"
      />
    </svg>
  );
};
