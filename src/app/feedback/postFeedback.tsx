"use client";

import React from "react";
import { IconContext } from "react-icons";
import { TbMessage } from "react-icons/tb";

export const PostFeedback: React.FC = () => {
  // TODO: use a modal to display the feedback form
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="cursor-pointer">
        <IconContext.Provider
          value={{
            size: "1.3rem",
            color: "#868e96",
          }}
        >
          <TbMessage />
        </IconContext.Provider>
      </span>
      <span className="text-color-text-secondary text-sm">Feedback</span>
    </div>
  );
};
