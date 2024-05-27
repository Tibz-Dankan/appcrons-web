import React from "react";
import Button from "@/app/shared/button";

interface DeleteAppProps {
  appId: string;
}

export const DeleteApp: React.FC<DeleteAppProps> = (props) => {
  return (
    <div>
      <div
        className="w-full border-[1px] border-color-border-primary rounded-md
         p-4 space-y-4"
      >
        <p className="text-sm text-color-text-primary">
          This operation is permanent and can't be reversed so be sure od what
          of what you are doing
        </p>
        <Button label={"Delete app"} type={"button"} className="bg-red-600" />
      </div>
    </div>
  );
};
