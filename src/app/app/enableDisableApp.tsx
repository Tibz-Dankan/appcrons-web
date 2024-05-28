import React from "react";
import Button from "../shared/button";

interface EnableDisableAppProps {
  appId: string;
  isDisabled: Boolean;
}

export const EnableDisableApp: React.FC<EnableDisableAppProps> = (props) => {
  // TODO: implement apis to enable and disable the application
  return (
    <div>
      <div
        className="w-full border-[1px] border-color-border-primary rounded-md
         p-4 space-y-4"
      >
        <p className="text-sm text-color-text-primary">
          By disabling this application, we won't make requests to it. And you
          enable it again
        </p>
        <Button label={"Disable"} type={"button"} />
      </div>
    </div>
  );
};
