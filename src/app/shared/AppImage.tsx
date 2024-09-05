"use client";

import React, { Fragment, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { useIsClient } from "@/hooks/UseIsClient";
import { useTheme } from "next-themes";

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
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const isClient = useIsClient();

  useEffect(() => {
    const setDefaultTheme = () => {
      const colorScheme = document.documentElement.style.colorScheme;
      const isDarkMode = colorScheme === "dark";
      const isLightMode = colorScheme === "light";

      setIsDarkMode(() => isDarkMode);
      setIsLightMode(() => isLightMode);
    };

    setTimeout(() => {
      setDefaultTheme();
    }, 10);
  }, [theme]);

  if (!isClient) {
    return null;
  }

  const hasDarkModeImage =
    (isDarkMode && props.darkModeSRC !== null) ||
    (isDarkMode && props.darkModeSRC !== undefined);

  const hasLightModeImage =
    (isLightMode && props.lightModeSRC !== null) ||
    (isLightMode && props.lightModeSRC !== undefined);

  const hasMultipleModeImages = hasDarkModeImage
    ? hasDarkModeImage
    : hasLightModeImage
    ? hasLightModeImage
    : false;

  const src = hasMultipleModeImages
    ? hasDarkModeImage
      ? props.darkModeSRC
      : props.lightModeSRC
    : props.src;

  return (
    <Fragment>
      <Image
        src={src!}
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
