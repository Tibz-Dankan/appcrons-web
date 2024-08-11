"use client";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "@/app/shared/Icons/MenuIcon";
import { ThemeController } from "@/app/shared/ThemeController";

export const MobileNavMenu: React.FC = () => {
  const pathname = usePathname();

  const isDocsPath = pathname.startsWith("/docs");

  // TODO: To show the dashboard when the user isLoggedIn

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className="inline-flex w-full justify-center gap-x-1.5 
         rounded-md bg-transparent p-4s text-sm font-semibold
         text-color-text-primary"
        >
          <MenuIcon />
        </MenuButton>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right
          divide-y divide-color-divide-primary rounded-md bg-color-bg-primary
          shadow-lg focus:outline-none border-[1px] border-color-border-primary"
        >
          <div className="p-5 flex flex-col gap-4">
            <MenuItem>
              {({ focus }) => (
                <Link
                  href="/docs"
                  className={`${isDocsPath && "bg-header-tab-bg"}
                  hover:text-primary focus:text-primary`}
                >
                  <span className="hover:text-inherit focus:text-inherit">
                    Documentation
                  </span>
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <div className="w-full flex items-center justify-between gap-2">
                  <span>Theme:</span>
                  <ThemeController />
                </div>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <Link
                  href="/auth/login"
                  className={`py-1 px-3 border-[1px] border-color-border-primary
                  rounded-md hover:text-primary focus:text-primary
                  text-center`}
                >
                  <span>Log In</span>
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <Link
                  href="/auth/signup"
                  className={`py-1 px-3 border-color-border-primary
                  rounded-md bg-primary text-gray-50 hover:bg-primary-light
                  focus:bg-primary-light w-full flex items-center justify-center`}
                >
                  <span>Sign Up</span>
                </Link>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};
