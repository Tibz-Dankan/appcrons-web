import React from "react";
import Button from "@/app/shared/button";

export const PostApp: React.FC = () => {
  // TODO: api

  return (
    <div className="w-full flex items-center justify-end p-4">
      <Button type="button" label={"New App"} />
    </div>
    // TODO: modal
  );
};
