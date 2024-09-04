"use client";
import React, { ReactNode } from "react";
import { DocsSidebar } from "@/app/layouts/DocsSidebar";
import { NavBar } from "@/app/home/Navbar";
import { usePathname } from "next/navigation";
import { extractLabelFromLink } from "@/utils/extractLabelFromLink";
import { ChevronDownIcon } from "@/app/shared/Icons/ChevronDownIcon";
import { Link } from "@/lib/router-events";
import { clientURL } from "@/constants";
import { MenuIcon } from "@/app/shared/Icons/MenuIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  closeSidebarHandler,
  openSidebarHandler,
} from "@/store/actions/sidebar";
import { TSidebarState } from "@/types/sidebar";

interface DocsLayoutProps {
  children: ReactNode;
}

export const DocsLayout: React.FC<DocsLayoutProps> = (props) => {
  const pathname = usePathname();
  const isOpenSidebar = useAppSelector(
    (state: TSidebarState) => state.sidebar.isOpen
  );

  const pathnameWords = pathname.split("/").filter((word) => word != "");

  const isLastWords = (pathnameWords: string[], index: number) => {
    return pathnameWords.length - 1 === index;
  };

  const dispatch: any = useAppDispatch();

  const handleOpenCloseSidebar = () => {
    if (isOpenSidebar) {
      dispatch(closeSidebarHandler());
      return;
    }
    dispatch(openSidebarHandler());
  };

  return (
    <div>
      <NavBar />
      <section
        className="xl:ml-80 flex items-start justify-center 
        xl:block"
      >
        <DocsSidebar />
        <main
          className="bg-color-bg-secondary mt-[120px] mb-16 xl:ml-14
           rounded-lg w-[90%] sm:w-4/5 xl:w-[70%] max-w-[700px] xl:max-w-[auto] 
           space-y-4 p-8 pt-2 relative border-[1px] border-color-border-primary"
        >
          <span
            className="absolute top-8 right-8 xl:hidden cursor-pointer"
            onClick={() => handleOpenCloseSidebar()}
          >
            <MenuIcon />
          </span>
          <div className="flex items-center justify-start">
            {pathnameWords.map((word, index) => (
              <div key={index}>
                {!isLastWords(pathnameWords, index) && (
                  <div className="flex items-center">
                    <Link
                      href={`/docs`}
                      className="text-color-text-secondary first-letter:uppercase
                       hover:text-primary-light hover:underline focus:text-primary-light
                       focus:underline"
                    >
                      {`${extractLabelFromLink(word)}`}
                    </Link>
                    <span>
                      <ChevronDownIcon className="w-8 h-8 text-color-text-secondary -rotate-90" />
                    </span>
                  </div>
                )}
                {isLastWords(pathnameWords, index) && (
                  <Link
                    href={`${clientURL}${pathname}`}
                    className="text-color-text-primary first-letter:uppercase
                    hover:text-primary-light hover:underline focus:text-primary-light
                    focus:underline"
                  >
                    {`${extractLabelFromLink(word)}`}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div>
            <h1 className="text-3xl font-semibold">
              {`${extractLabelFromLink(
                pathnameWords[pathnameWords.length - 1]
              )}`}
            </h1>
          </div>
          <div>{props.children}</div>
        </main>
      </section>
    </div>
  );
};
