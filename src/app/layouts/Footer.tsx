import React from "react";
import { PostFeedback } from "@/app/feedback/PostFeedback";
import { Link } from "@/lib/router-events";
import { FoldedHandsIcon } from "@/app/shared/Icons/FoldedHandsIcon";
import { WarningIcon } from "@/app/shared/Icons/WarningIcon";
import { DocumentIcon } from "../shared/Icons/DocumentIcon";

export const Footer: React.FC = () => {
  return (
    <footer
      className="w-full flex flex-col items-center 
       justify-center mt-12"
    >
      <div
        className="w-full px-10 max-w-[1280px] flex items-center
        justify-between py-6 gap-4"
      >
        <div className="text-color-text-secondary space-x-1 text-sm">
          <span className="-mr-2s">&copy;</span>
          <span>{new Date().getFullYear()}</span>
          <span>Appcrons.</span>
          <span>All rights reserved</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link href="/docs" className="flex items-start justify-center gap-1">
            <DocumentIcon className="text-color-text-secondary" />
            <span className="text-color-text-secondary">Docs</span>
          </Link>
          <PostFeedback />
          <Link
            href="/acknowledgement"
            className="flex items-start justify-center gap-1"
          >
            <FoldedHandsIcon className="text-color-text-secondary w-4 h-4" />
            <span className="text-color-text-secondary text-sm">
              Acknowledgement
            </span>
          </Link>
          <Link
            href="/disclaimer"
            className="flex items-start justify-center gap-1"
          >
            <WarningIcon className="text-color-text-secondary w-4 h-4" />
            <span className="text-color-text-secondary text-sm">
              Disclaimer
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
