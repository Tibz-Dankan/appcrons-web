import React, { useState } from "react";
import { TApp } from "@/types/app";
import { EnableDisableApp } from "@/app/app/enableDisableApp";

interface EnableDisableAppProps {
  app: TApp;
}

export const EnableDisableAppCard: React.FC<EnableDisableAppProps> = (
  props
) => {
  const app = props.app;
  const [isEnabled, setIsEnabled] = useState<boolean>(!app.isDisabled);

  const onEnableDisableHandler = (app: TApp) => {
    setIsEnabled(() => !app.isDisabled);
  };

  return (
    <div
      className="flex items-center justify-between border-[1px]
       border-color-border-primary rounded-md p-8"
    >
      <div className="flex flex-col gap-2 ">
        <p className="text-xl font-semibold text-color-text-primary">
          {isEnabled ? (
            <span>Disable Application</span>
          ) : (
            <span>Enable Application</span>
          )}
        </p>
        <p>
          {isEnabled ? (
            <span>
              Once an application is disabled, it can no longer receive requests
              but you can always enable it again.
            </span>
          ) : (
            <span>
              Once an application is enabled, it receives requests at specified
              interval.
            </span>
          )}
        </p>
      </div>
      <div
        className="border-[1px] border-color-border-primary
         rounded px-4 py-2 pb-1 bg-color-bg-secondary"
      >
        <EnableDisableApp app={app} onEnableDisable={onEnableDisableHandler} />
      </div>
    </div>
  );
};
