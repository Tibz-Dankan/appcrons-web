import React from "react";
import { ProgressBar } from "@/app/shared/ProgressBar";
import { useSearchParams } from "next/navigation";

export const PostAppProgress: React.FC = () => {
  const searchParams = useSearchParams();

  const action = searchParams.get("action") as string;
  const step = searchParams.get("step") as string;
  const appId = searchParams.get("appId") as string;

  const currentStep = step ? step : "1";

  const steps = [
    { step: 1, label: "Create new application" },
    { step: 2, label: "Enable application" },
    { step: 3, label: "Finish" },
  ];

  const getLabel = (inputStep: number): string => {
    if (!inputStep) return steps[0].label;

    const foundStep = steps.find((step) => step.step === inputStep);
    const label = foundStep?.label as string;
    return label;
  };

  return (
    <div className="inline-block">
      <ProgressBar
        stepNum={3}
        stepList={steps}
        currentStep={parseInt(currentStep)}
      />
    </div>
  );
};
