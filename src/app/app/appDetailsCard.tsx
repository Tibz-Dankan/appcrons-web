"use client";
import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/hooks/redux";
import { elapsedTime } from "@/utils/elapsedTime";
import { truncateString } from "@/utils/truncateString";

interface AppDetailsCardProps {
  appId: string;
}

export const AppDetailsCard: React.FC<AppDetailsCardProps> = (props) => {
  const app = useAppSelector((state) =>
    state.app.apps.find((app) => app.id === props.appId)
  )!;
  return (
    <div
      className="w-full flex flex-col items-start justify-center gap-0
      border-[1px] border-color-border-primary rounded-md"
    >
      <div
        className="w-full flex items-center justify-start gap-2
        px-8 text-base bg-color-bg-secondary rounded-t-md py-2
        border-b-[1px] border-color-border-primary"
      >
        <span className="text-base font-semibold">
          {truncateString(app.name, 30)}
        </span>
      </div>
      <div
        className="w-full flex items-center justify-start gap-2
         px-8 mt-3"
      >
        <Link
          href={`${app.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline focus:underline"
        >
          {truncateString(app.url, 50)}
        </Link>
      </div>
      <div
        className="w-full flex items-center justify-start gap-2
         px-8 mt-3"
      >
        <span className="">Request Interval:</span>
        <span>{app.requestInterval} minutes</span>
      </div>
      <div
        className="w-full flex items-center justify-start gap-2
         px-8 mt-3"
      >
        <span className="">Added:</span>
        <span>{elapsedTime(app.createdAt)}</span>
      </div>
      <div
        className="w-full flex items-center justify-start gap-2
         px-8 my-3"
      >
        <span className="">Last updated:</span>
        <span>{elapsedTime(app.updatedAt)}</span>
      </div>
    </div>
  );
};
