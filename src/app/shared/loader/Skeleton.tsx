import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

interface SkeletonLoaderProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonLoaderProps> = (props) => {
  return (
    <Fragment>
      <div
        className={twMerge(`skeleton w-32 h-32 relative`, props.className)}
      ></div>
    </Fragment>
  );
};

export default Skeleton;
