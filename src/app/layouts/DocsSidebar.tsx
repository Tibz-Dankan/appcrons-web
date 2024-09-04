"use client";

import React from "react";
import { CloseIcon } from "@/app/shared/Icons/CloseIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { TSidebarState } from "@/types/sidebar";
import { closeSidebarHandler } from "@/store/actions/sidebar";
import { Link } from "@/lib/router-events";
import { extractLabelFromLink } from "@/utils/extractLabelFromLink";
import { DocumentIcon } from "@/app/shared/Icons/DocumentIcon";
import { usePathname } from "next/navigation";

export const DocsSidebar = () => {
  const pathname = usePathname();
  const isOpenSidebar = useAppSelector(
    (state: TSidebarState) => state.sidebar.isOpen
  );

  const isActivePath = (path: string): boolean => {
    return pathname.includes(path);
  };

  const dispatch: any = useAppDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebarHandler());
  };

  const links = [
    "how-appcrons-works",
    "get-started",
    "add-application",
    "add-request-time-frame",
  ];

  return (
    <aside
      className={`fixed inset-0 top-20 z-[120] h-[100vh] w-80 
      transition-transform duration-300 xl:translate-x-0
      ${isOpenSidebar ? "translate-x-0" : "-translate-x-80"}`}
    >
      <div
        className="bg-color-bg-secondary ml-14 mt-10 p-8 h-[70vh]
        rounded-lg relative flex flex-col gap-8 border-[1px]
        border-color-border-primary"
      >
        <span
          onClick={() => handleCloseSidebar()}
          className="cursor-pointer absolute right-2 top-2 grid 
          rounded-br-none rounded-tl-none xl:hidden z-20"
        >
          <CloseIcon className="text-color-text-primary" />
        </span>
        <div
          className="flex items-center justify-center gap-2 rounded-md
           border-[1px] border-secondary p-4"
        >
          <DocumentIcon className="text-inherit" />
          <span className="text-inherit text-lg">Documentation</span>
        </div>
        <div className="flex flex-col gap-4">
          {links.map((link, index) => (
            <Link
              key={index}
              href={`/docs/${link}`}
              className={`first-letter:uppercase hover:text-primary-light
              hover:underline focus:text-primary-light focus:underline ${
                isActivePath(link) && "text-primary-light"
              }`}
            >
              <span>{extractLabelFromLink(link)}</span>
            </Link>
          ))}
        </div>
        <div
          className="flex items-center justify-center text-sm p-8 pb-6
           text-color-text-secondary absolute bottom-0 left-0"
        >
          <span>&copy;</span>
          <span>{new Date().getFullYear()}</span>
          <span className="ml-1">Appcrons</span>
        </div>
      </div>
    </aside>
  );
};
