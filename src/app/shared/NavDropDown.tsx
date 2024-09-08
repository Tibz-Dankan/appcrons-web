"use client";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Link from "next/link";
import { useAppSelector } from "@/hooks/redux";
import { PersonIcon } from "@/app/shared/Icons/PersonIcon";
import { ReactNode, useState } from "react";
import { SettingsIcon } from "@/app/shared/Icons/SettingsIcon";
import { truncateString } from "@/utils/truncateString";
import { LogOut } from "@/app/auth/Logout";
import { useLogOut } from "@/hooks/useLogOut";
import { Spinner } from "@/app/shared/loader/Spinner";

interface NavDropDownProps {
  children: ReactNode;
}

const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};

export const NavDropDown: React.FC<NavDropDownProps> = (props) => {
  const username = useAppSelector((state) => state.auth.user.name);
  const [triggerLogOut, setTriggerLogOut] = useState(false);

  const { isLoggingOut } = useLogOut({ triggerLogOut: triggerLogOut });

  const onTriggerLogoutHandler = (triggered: boolean) => {
    setTriggerLogOut(() => triggered);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className="inline-flex w-full justify-center items-center gap-x-1.5 
           rounded-md bg-transparent text-sm font-semibold
           text-color-text-primary relative"
        >
          {isLoggingOut && (
            <Spinner className="absolute top-1 left-[10px] text-gray-200 w-6 h-6" />
          )}
          {props.children}
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
           divide-y divide-gray-100s divide-color-divide-primary
           rounded-md bg-whites bg-color-bg-primary shadow-lg 
           ring-1s ring-blacks ring-opacity-5s focus:outline-none 
           border-[1px] border-color-border-primary"
        >
          <div className="py-1">
            <MenuItem>
              {({ focus }) => (
                <Link
                  href="/dashboard"
                  className={classNames(
                    focus ? "bg-gray-100s bg-color-bg-secondary" : "",
                    "block px-4 py-2 text-sm text-color-text-primary"
                  )}
                >
                  <div className="flex items-center justify-start gap-4">
                    <PersonIcon />
                    <span>{truncateString(username, 18)}</span>
                  </div>
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <Link
                  href="/settings"
                  className={classNames(
                    focus ? "bg-gray-100s bg-color-bg-secondary" : "",
                    "block px-4 py-2 text-sm text-color-text-primary"
                  )}
                >
                  <div className="flex items-center justify-start gap-4">
                    <SettingsIcon />
                    <span>Account settings</span>
                  </div>
                </Link>
              )}
            </MenuItem>
          </div>
          <div className="py-1">
            <MenuItem>
              {({ focus }) => (
                <div
                  className={classNames(
                    focus ? "bg-gray-100s bg-color-bg-secondary" : "",
                    ""
                  )}
                >
                  <LogOut onTrigger={onTriggerLogoutHandler} />
                </div>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};
