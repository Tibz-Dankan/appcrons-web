import React, { ReactNode, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRouter as useEnhancedRouter } from "@/lib/router-events";
import { Modal } from "@/app/shared/Modal";
import Button from "@/app/shared/Button";
import { PlusIcon } from "@/app/shared/Icons/PlusIcon";
import { PostApp } from "@/app/app/PostApp";
import { TApp } from "@/types/app";
import { PostAppProgress } from "@/app/app/PostAppProgress";
import { EnableAppOnPost } from "@/app/app/EnableAppOnPost";
import { PostAppExit } from "@/app/app/PostAppExit";

interface PostAppLayoutProps {
  postLabel?: ReactNode;
}

export const PostAppLayout: React.FC<PostAppLayoutProps> = (props) => {
  const [isClosedModal, setIsClosedModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const enhancedRouter = useEnhancedRouter();

  const action = searchParams.get("action") as string;
  const step = searchParams.get("step") as string;
  const appId = searchParams.get("appId") as string;

  const steps = [
    { step: 1, label: "Create new application" },
    { step: 2, label: "Enable application" },
    { step: 3, label: "Finish" },
  ];

  const hasPostAppParams = action && step;
  // router.push(`?action=createapp&step=1`); // step-1, createapp
  // router.push(
  //   `?action=enableapp&step=2&appId=29288017-802f-4936-a8aa-6c5ef708257c`
  // ); // step-2, enable
  // router.push(
  //   `?action=finish&step=3&s&appId=29288017-802f-4936-a8aa-6c5ef708257c`
  // ); // step-3, finish

  const showPostAppForm =
    (action === "createapp" && parseInt(step) === 1) || !hasPostAppParams;
  const showEnableAppOnPost = action === "enableapp" && parseInt(step) === 2;
  const showPostAppExit = action === "finish" && parseInt(step) === 3;

  const onPostHandler = (app: TApp) => {
    // TODo: to add a timeout  of 3 seconds maybe
    router.push(`?action=enableapp&step=2&appId=${app.id}`);
  };

  const onEnableAppHandler = (app: TApp) => {
    // TODo: to add a timeout  of 3 seconds maybe
    router.push(`?action=finish&step=3&appId=${app.id}`);
  };

  const onExitHandler = (isFinished: boolean) => {
    if (!isFinished) return;

    setIsClosedModal(() => isFinished);
    enhancedRouter.push(`/app/${appId}`);
  };

  const getLabel = (inputStep: number): string => {
    if (!inputStep) return steps[0].label;

    const foundStep = steps.find((step) => step.step === inputStep);
    const label = foundStep?.label as string;
    return label;
  };

  const hasPropsLabel = !!props.postLabel;

  return (
    <div>
      <Modal
        openModalElement={
          <>
            {!hasPropsLabel && (
              <Button
                type="button"
                label={
                  <div className="flex items-center justify-center gap-2">
                    <PlusIcon className="text-gray-200 h-6 w-6" />
                    <span className="hidden md:block">New</span>
                  </div>
                }
                className="h-auto py-1 px-3"
              />
            )}
            {hasPropsLabel && props.postLabel}
          </>
        }
        closed={isClosedModal}
      >
        <div className="flex items-start justify-center gap-2">
          <div className="p-8 pt-6 pr-0 space-y-4">
            <p className="text-2xl font">Steps</p>
            <div
              className="w-64 p-4 border-[1px] border-color-border-primary 
               rounded-md"
            >
              <PostAppProgress />
            </div>
          </div>
          <div className="p-8 pt-6 flex flex-col gap-4 min-h-[54vh] h-full bg-blue-500s">
            <h4 className="text-2xl">{getLabel(parseInt(step))}</h4>
            {showPostAppForm && <PostApp onPost={onPostHandler} />}
            {showEnableAppOnPost && (
              <EnableAppOnPost onEnable={onEnableAppHandler} />
            )}
            {showPostAppExit && <PostAppExit onExit={onExitHandler} />}
            {/*  */}
          </div>
        </div>
      </Modal>
    </div>
  );
};
