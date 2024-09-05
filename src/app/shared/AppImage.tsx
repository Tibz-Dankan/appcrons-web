"use client";

import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

interface AppImageProps {
  src: string;
  darkModeSRC?: string;
  lightModeSRC?: string;
  width: number;
  height: number;
  className?: string;
  alt?: string;
}

export const AppImage: React.FC<AppImageProps> = (props) => {
  const colorScheme = document.documentElement.style.colorScheme;
  const isDarkMode = colorScheme === "dark";

  const hasDarkModeImage =
    (isDarkMode && props.darkModeSRC !== null) ||
    (isDarkMode && props.darkModeSRC !== undefined);

  const hasLightModeImage =
    (!isDarkMode && props.lightModeSRC !== null) ||
    (!isDarkMode && props.lightModeSRC !== undefined);

  const hasMultipleModeImages = hasDarkModeImage || hasLightModeImage;

  const src = hasMultipleModeImages
    ? hasDarkModeImage
      ? props.darkModeSRC
      : props.lightModeSRC
    : props.src;

  return (
    <Fragment>
      <Image
        src={props.src}
        width={1350}
        height={600}
        alt={props.alt!}
        className={twMerge(
          `w-full h-auto aspect-[4/3] rounded-md bg-gray-300
           object-cover border-[1px] border-secondary`,
          props.className
        )}
      />
    </Fragment>
  );
};
