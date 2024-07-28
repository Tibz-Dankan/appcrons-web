import React, { useState } from "react";
import { ToggleSwitch } from "@/app/shared/ToggleSwitch";
import { TApp } from "@/types/app";
import { useMutation } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { AppService } from "@/services/app.service";
import { Spinner } from "@/app/shared/loader/Spinner";
import { updateOneApp } from "@/store/actions/app";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "../shared/Button";

interface EnableAppOnPost {
  onEnable: (app: TApp) => void;
}

export const EnableAppOnPost: React.FC<EnableAppOnPost> = (props) => {
  const searchParams = useSearchParams();
  const appId = searchParams.get("appId") as string;

  const app = useAppSelector((state) =>
    state.app.apps.find((app) => app.id === appId)
  ) as TApp;

  const [isEnabled, setIsEnabled] = useState<boolean>(!app.isDisabled);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { isPending, mutate } = useMutation({
    mutationFn: new AppService().enable,
    onSuccess: async (response: any) => {
      setIsEnabled(() => !response.app.isDisabled);
      dispatch(updateOneApp({ app: response.app }));
      props.onEnable(response.app);
      dispatch(
        showCardNotification({ type: "success", message: response.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);

      // skipToNextStepHandler();
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

  const skipToNextStepHandler = () => {
    router.push(`?action=finish&step=3&appId=${app.id}`);
  };

  return (
    <div
      className="w-[90%] sm:w-96 flex flex-col items-center 
       justify-start gap-4 h-full bg-green-500s flex-1 relative"
    >
      <div className="w-full">
        <p className="w-full text-start">
          Enable this application so that it's able receives requests to keep it
          active.
        </p>
      </div>
      <div className="w-full flex items-center justify-start">
        <div
          className="relative border-[1px] 
           border-color-border-primary rounded px-4 py-2 
           pb-1 bg-color-bg-secondary flex justify-end text-end"
        >
          <ToggleSwitch
            disabled={isPending}
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
          {isPending && (
            <div
              className="w-full h-full absolute -top-1 left-1 grid
               place-items-center cursor-not-allowed"
            >
              <Spinner className="w-5 h-5 text-gray-200" />
            </div>
          )}
        </div>
      </div>
      <Button
        onClick={() => skipToNextStepHandler()}
        label={<span>Skip</span>}
        type={"button"}
        className="bg-color-bg-secondary text-color-text-primary outline-none
        hover:text-primary-light focus:text-primary-light absolute
        -bottom-7 right-0 h-auto py-1"
      />
    </div>
  );
};
