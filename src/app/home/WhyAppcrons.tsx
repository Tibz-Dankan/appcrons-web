import React from "react";
import { WarningIcon } from "@/app/shared/Icons/WarningIcon";
import { CheckIcon } from "@/app/shared/Icons/CheckIcon";
import { DotIcon } from "@/app/shared/Icons/DotIcon";

export const WhyAppcrons: React.FC = () => {
  const AppCronSolutions = [
    {
      limitation: {
        title: "Idle Shutdowns",
        description:
          "Backend servers on the free plan shut down after 15 minutes of inactivity, causing long cold starts (up to 50 seconds or more) when they need to restart.",
      },
      solution: {
        title: "Prevents Idle Shutdowns",
        description:
          "By sending automated requests at intervals of 5, 10, or 15 minutes, Appcrons keeps your backend servers awake and responsive, eliminating frustrating cold starts.",
      },
    },
    {
      limitation: {
        title: "Usage Limits",
        description:
          "The free tier is limited to 750 hours per month, which can be challenging to manage, especially with multiple apps.",
      },
      solution: {
        title: "Manages Usage Efficiently",
        description:
          " Appcrons allows you to specify time frames and time zones for when requests should be made, ensuring you stay within Render's free usage limits.",
      },
    },
  ];

  const isLastElement = (list: any[], index: number): boolean => {
    return index === list.length - 1;
  };

  const isFirstElement = (index: number): boolean => {
    return index === 0;
  };

  return (
    <div className="w-full mt-16 sm:mt-8 lg:mt-16 space-y-16">
      <div className="w-full text-center space-y-2">
        <p className="text-3xl font-semibold">Why Appcrons?</p>
        <p className="text-color-text-secondary text-base">
          Tackling Render's Free Tier Limitations
        </p>
      </div>
      <div className="w-full flex items-start gap-4">
        <table
          className="border-separate border-spacing-0 
           w-full overflow-x-auto"
        >
          <thead>
            <tr
              className="[&>*]:bg-color-bg-secondary [&>*]:border-y-[1px] 
               [&>*]:border-color-border-primary uppercase text-sm"
            >
              <th
                className="px-2 pl-4 py-4 text-centers border-x-[1px] 
                border-color-border-primary rounded-tl-md"
              >
                <p className="flex items-center justify-start gap-2">
                  <span>
                    <WarningIcon />
                  </span>
                  <span>Limitations</span>
                </p>
              </th>
              <th
                className="px-2 py-4 text-centers border-r-[1px] 
                border-color-border-primary rounded-tr-md"
              >
                <p className="flex items-center justify-start gap-2 pl-[6px]">
                  <span>
                    <CheckIcon />
                  </span>
                  <span>Solutions</span>
                </p>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {AppCronSolutions.map((AppCronSolution, index) => {
              return (
                <tr
                  className="h-14 [&>*]:border-b-[1px] 
                  [&>*]:border-color-border-primary text-sm"
                  key={index}
                >
                  <td
                    className={`px-2 pl-4 border-x-[1px] space-y-2  
                    border-color-border-primary cursor-pointer 
                    ${
                      isLastElement(AppCronSolutions, index) && "rounded-bl-md"
                    }`}
                  >
                    <p
                      className={`text-base bg-[rgba(255,143,0,0.1)]
                      text-[#ff8f00] flex items-center pl-1 p-1 rounded-3xl ${
                        isFirstElement(index) ? "max-w-44" : "max-w-40"
                      }`}
                    >
                      <span>
                        <DotIcon className="text-[#ff8f00] w-9 h-9" />
                      </span>
                      <span>{AppCronSolution.limitation.title}</span>
                    </p>
                    <p className="text-sm text-color-text-secondary">
                      {AppCronSolution.limitation.description}
                    </p>
                  </td>

                  <td
                    className={`p-4 border-r-[1px] border-color-border-primary
                     space-y-2
                  ${isLastElement(AppCronSolutions, index) && "rounded-br-md"}`}
                  >
                    <p
                      className={`text-base bg-[rgba(51,214,159,0.1)]
                      text-[#33d69f] flex items-center pl-1 p-1 rounded-3xl ${
                        isFirstElement(index) ? "max-w-60" : "max-w-64"
                      }`}
                    >
                      <span>
                        <DotIcon className="text-[#33d69f] w-9 h-9" />
                      </span>
                      <span>{AppCronSolution.solution.title}</span>
                    </p>
                    <p className="text-sm text-color-text-secondary">
                      {AppCronSolution.solution.description}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
