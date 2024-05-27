"use client";
import React from "react";
import { IconContext } from "react-icons";
import { GiPokecog } from "react-icons/gi";
import { RiEdit2Fill } from "react-icons/ri";
import Link from "next/link";
import { RequestTimeRangeCard } from "@/app/request/requestTimeRangeCard";
import apps from "@/app/app/data/apps.json";
import { PostRequestTimeRange } from "@/app/request/postRequestTimeRange";
import { RequestList } from "@/app/request/requestList";

export default function MyApp() {
  // TODO: Fetch app data based on the id from the url
  // TODO: To dynamically change the icon color basing on the theme
  // TODO: To apply the application name in the favicon

  const app = apps.apps[1];

  return (
    <div className="p-4 space-y-8 text-sm">
      {/* Basic app info */}
      <div
        className="flex items-start justify-between gap-4
        border-b-[1px] border-color-border-primary pb-8"
      >
        <div className="flex flex-col items-start justify-center">
          <div className="w-40 flex items-center justify-between gap-4">
            <p className="flex items-center gap-2">
              <span>
                <IconContext.Provider
                  value={{
                    size: "1.2rem",
                    color: "#868e96",
                  }}
                >
                  <GiPokecog />
                </IconContext.Provider>
              </span>
              <span className="text-sm uppercase">Application</span>
            </p>
            <p className="flex items-center gap-2 cursor-pointer">
              <span>
                <IconContext.Provider
                  value={{
                    size: "1.2rem",
                    color: "#868e96",
                  }}
                >
                  <RiEdit2Fill />
                </IconContext.Provider>
              </span>
              <span className="text-sm">Edit</span>
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2 mt-2">
            <p className="text-xl font-semibold">{app.name}</p>
            <p>
              <Link
                href={`${app.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {app.url}
              </Link>
            </p>
            <RequestTimeRangeCard requestTime={app.requestTimes} />
          </div>
        </div>
        <div>
          <PostRequestTimeRange appId={app.id} requestTime={app.requestTimes} />
        </div>
      </div>
      {/* App Request Time paginated */}
      {/* <div>App's latest requests in the table</div> */}
      <RequestList appId={app.id} />
      {/* Disable/Enable App */}
      <div>Disable/Enable</div>
      {/* Delete app functionality */}
      <div>Delete app operation</div>
    </div>
  );
}
