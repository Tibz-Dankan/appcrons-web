import React, { useState } from "react";
import { ToggleSwitch } from "@/app/shared/toggleSwitch";
import { TApp } from "@/types/app";
import { useMutation } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { useAppDispatch } from "@/hooks/redux";
import { AppService } from "@/services/app.service";
import { getAccessToken } from "@/utils/getAccessToken";
import { Spinner } from "@/app/shared/loader/spinner";
interface EnableDisableAppProps {
  app: TApp;
}

export const EnableDisableApp: React.FC<EnableDisableAppProps> = (props) => {
  const app = props.app;
  const [isEnabled, setIsEnabled] = useState<boolean>(!app.isDisabled);
  const accessToken = getAccessToken();
  const dispatch = useAppDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: isEnabled ? new AppService().disable : new AppService().enable,
    onSuccess: async (response: any) => {
      // TODO: maybe parse updated app data to the parent component
      setIsEnabled(() => !response.app.isDisabled);
      dispatch(
        showCardNotification({ type: "success", message: response.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error: any) => {
      setIsEnabled(() => !app.isDisabled);
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const enableDisableHandler = () => {
    mutate({ appId: app.id, accessToken: accessToken });
  };

  const onCheckHandler = (checked: boolean) => {
    enableDisableHandler();
  };

  return (
    <div className="relative inline-block">
      <ToggleSwitch
        disabled={isLoading}
        onCheck={onCheckHandler}
        checked={isEnabled}
        checkedIcon={<div />}
        uncheckedIcon={<div />}
        offColor={"#adb5bd"}
        onColor={"#12b886"}
        offHandleColor={"#495057"}
        onHandleColor={"#087f5b"}
        diameter={20}
        height={12}
        width={40}
      />
      {isLoading && (
        <div
          className="w-full h-full absolute -top-1 left-1 grid
           place-items-center cursor-not-allowed"
        >
          <Spinner className="w-5 h-5 text-gray-200" />
        </div>
      )}
    </div>
  );
};
