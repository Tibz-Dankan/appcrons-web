import React from "react";
import { PostFeedback } from "@/app/feedback/postFeedback";

export const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-start p-4 gap-4">
      <PostFeedback />
      <div className="text-color-text-secondary space-x-2 text-sm">
        <span className="-mr-2">AppCrons&copy;</span>
        <span>{new Date().getFullYear()}.</span>
        <span>All rights reserved</span>
      </div>
    </footer>
  );
};
