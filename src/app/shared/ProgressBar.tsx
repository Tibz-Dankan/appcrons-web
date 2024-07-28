import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

type TStep = {
  label: string;
  step: number;
};

interface ProgressBarProps {
  stepNum: number;
  stepList: TStep[];
  currentStep: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const generateStepsArray = () => {
    const steps = [];
    for (let i = 1; i <= props?.stepNum; i++) {
      steps.push(i);
    }
    return steps;
  };

  const steps = generateStepsArray();
  const stepList = props.stepList;

  const label = (elementStage: number, elementIndex: number) => {
    if (elementStage === stepList[elementIndex].step)
      return stepList[elementIndex].label;
  };

  const filledCircle = (elementIndex: number) => {
    const elementStage = elementIndex + 1;
    return elementStage <= props.currentStep;
  };

  const filledBar = (elementIndex: number) => {
    const elementStage = elementIndex + 1;
    return elementStage < props.currentStep;
  };

  const isCurrentStage = (elementIndex: number) => {
    const elementStage = elementIndex + 1;
    return elementStage === props.currentStep;
  };

  return (
    <Fragment>
      <div
        className={twMerge(
          "w-56 flex flex-col items-start justify-center",
          props.className
        )}
      >
        {steps.map((stage, index) => {
          return (
            <div key={stage} className="">
              {stage === steps.length && (
                <div className="">
                  <div className="flex items-center justify-start relative">
                    <span
                      className={` ${
                        isCurrentStage(index)
                          ? "font-bold text-base"
                          : "font-normal text-sm"
                      } w-8 h-8 text-sm flex items-center justify-center 
                        rounded-[50%] z-10 ${
                          filledCircle(index)
                            ? "bg-primary text-gray-100"
                            : "bg-gray-300 text-gray-800"
                        }`}
                    >
                      {stage}
                    </span>
                    <label
                      className={`
                       text-color-text-primary text-start whitespace-normal min-w-52
                       absolute left-10  h-auto
                       ${
                         isCurrentStage(index)
                           ? "font-bold text-base top-1"
                           : "font-normal text-sm top-[6px]"
                       }`}
                    >
                      {label(stage, index)}
                    </label>
                  </div>
                </div>
              )}
              {stage !== steps.length && (
                <div className="flex flex-col items-center justify-start">
                  <div className="flex items-center justify-start relative">
                    <span
                      className={`${
                        isCurrentStage(index) && "font-bold text-base"
                      } w-8 h-8 text-sm flex items-center justify-center 
                        rounded-[50%] z-10 ${
                          filledCircle(index)
                            ? "bg-primary text-gray-100"
                            : "bg-gray-300 text-gray-800"
                        }`}
                    >
                      {stage}
                    </span>
                    <label
                      className={`
                      text-color-text-primary text-start whitespace-normal min-w-52
                      absolute left-10  h-auto
                      ${
                        isCurrentStage(index)
                          ? "font-bold text-base top-1"
                          : "font-normal text-sm top-[6px]"
                      }`}
                    >
                      {label(stage, index)}
                    </label>
                  </div>
                  <span
                    className={`h-20 w-[6px] -my-2 ${
                      filledBar(index) ? "bg-primary" : "bg-gray-300"
                    }`}
                  ></span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
