import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

interface SkeletonLoaderProps {
  className?: string;
  innerLoaderClassName?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = (props) => {
  return (
    <Fragment>
      <div
        className={twMerge(
          `w-full h-full bg-color-skeleton-bg rounded-md relative`,
          props.className
        )}
      >
        <div
          className={twMerge(
            `h-full w-1/2 absolute left-0 animate-moveInnerLoaderToRight
             bg-gradient-to-r from-color-skeleton-from via-color-skeleton-via
             to-color-skeleton-to skew-x-[-5deg] opacity-70`,
            props.innerLoaderClassName
          )}
        ></div>
      </div>
    </Fragment>
  );
};
