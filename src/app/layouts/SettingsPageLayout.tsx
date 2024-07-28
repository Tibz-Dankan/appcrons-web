"use client";

import React, { Fragment, useState, useEffect } from "react";
import { TPageLink } from "@/types/page";
import { Link } from "@/lib/router-events";
import { SettingsIcon } from "@/app/shared/Icons/SettingsIcon";

interface settingsLayoutProps {
  pageIcon?: string;
  pageLabel: string;
  pageLinks: TPageLink[];
}

export const SettingsPageLayout: React.FC<settingsLayoutProps> = (props) => {
  const pageLinks = props.pageLinks;
  const urlHash = window.location.hash;

  const candidateActivePageLink = pageLinks.find((pageLink) =>
    pageLink.linkValue.includes(urlHash)
  )!;

  const [activePageLink, setActivePageLink] = useState(
    candidateActivePageLink ? candidateActivePageLink : pageLinks[0]
  );

  const setActiveLinkHandler = (pageLink: TPageLink) => {
    setActivePageLink(() => pageLink);
  };

  const activeLinkStyles = `text-color-text-primary before:absolute before:top-1 
                            before:left-0 before:w-1 before:h-4/5 before:bg-primary-light`;
  return (
    <Fragment>
      <div className="w-full transition-all space-y-8">
        <div
          className="border-[1px] border-color-border-primary 
           flex items-center justify-start gap-x-3 p-3 rounded-md"
        >
          <SettingsIcon />
          <span className="text-xl text-color-text-primary">
            {props.pageLabel}
          </span>
        </div>
        <div className="sm:flex items-start justify-start w-full gap-x-8">
          <aside
            className="my-8 sm:my-0 w-auto text-color-text-secondary
             rounded-md border-[1px] p-6 border-color-border-primary"
          >
            <ul className="">
              {pageLinks?.map((pageLink, index) => (
                <li
                  key={index}
                  className={`pl-4 px-3 py-2 relative hover:underline focus:underline ${
                    pageLink.linkValue === activePageLink.linkValue &&
                    activeLinkStyles
                  }`}
                  onClick={() => setActiveLinkHandler(pageLink)}
                >
                  <Link href={`/${pageLink.linkValue}`}>
                    {pageLink.linkName}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <section
            className="flex-1 border-[1px] p-6 border-color-border-primary
             rounded-md"
          >
            <div
              className="font-semibold text-lg border-b-[1px]
               border-color-border-primary pb-6 mb-6"
            >
              {activePageLink.linkContentHeader
                ? activePageLink.linkContentHeader
                : activePageLink.linkName}
            </div>
            <div className="mb-6 z-20">{activePageLink.linkComponent}</div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};
