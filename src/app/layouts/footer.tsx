import React from "react";
import { PostFeedback } from "@/app/feedback/postFeedback";

export const Footer: React.FC = () => {
  return (
    <footer
      className="w-full flex flex-col items-center 
       justify-center mt-16"
    >
      <div
        className="w-full max-w-[1280px]s px-10s flex 
        items-center justify-center"
      >
        <div
          className="border-b-[1px] border-color-border-primary
           w-full"
        />
      </div>
      <div
        className="w-full px-10 max-w-[1280px] flex items-center
        justify-start py-6 gap-4"
      >
        <PostFeedback />
        <div className="text-color-text-secondary space-x-2 text-sm">
          <span className="-mr-2">Appcrons&copy;</span>
          <span>{new Date().getFullYear()}.</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};
