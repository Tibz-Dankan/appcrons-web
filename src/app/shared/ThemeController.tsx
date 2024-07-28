"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ToggleSwitch } from "@/app/shared/ToggleSwitch";
import { MoonIcon } from "@/app/shared/Icons/MoonIcon";
import { SunIcon } from "@/app/shared/Icons/SunIcon";

export const ThemeController = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const changeThemeHandler = (checked: boolean) => {
    if (checked) {
      setTheme("dark");
      setIsDarkMode(() => checked);
      return;
    }
    setTheme("light");
    setIsDarkMode(() => checked);
  };

  return (
    <div>
      <ToggleSwitch
        onCheck={changeThemeHandler}
        checked={isDarkMode}
        checkedIcon={
          <div className="h-full grid place-items-center">
            <SunIcon />
          </div>
        }
        uncheckedIcon={
          <div className="h-full grid place-items-center">
            <MoonIcon />
          </div>
        }
        offColor={"#adb5bd"}
        onColor={"#495057"}
        offHandleColor={"#f8f9fa"}
        onHandleColor={"#0ca678"}
        diameter={18}
      />
    </div>
  );
};
