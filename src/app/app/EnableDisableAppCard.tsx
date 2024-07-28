import React, { useState } from "react";
import { TApp } from "@/types/app";
import { EnableDisableApp } from "@/app/app/EnableDisableApp";
import { useAppSelector } from "@/hooks/redux";

interface EnableDisableAppProps {
  app: TApp;
}

export const EnableDisableAppCard: React.FC<EnableDisableAppProps> = (
  props
) => {
  const app = useAppSelector((state) =>
    state.app.apps.find((app) => app.id === props.app.id)
  )!;
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
        <p className="text-xl text-color-text-primary">
          {isEnabled ? (
            <span>Disable Application</span>
          ) : (
            <span>Enable Application</span>
          )}
        </p>
        <p>
          {isEnabled ? (
            <span className="text-color-text-secondary">
              Once an application is disabled, it can no longer receive requests
              but you can always enable it again.
            </span>
          ) : (
            <span className="text-color-text-secondary">
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
