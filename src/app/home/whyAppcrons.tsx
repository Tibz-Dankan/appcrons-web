import React from "react";

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

  return (
    <div className="w-full mt-16 space-y-16">
      <div className="w-full text-center space-y-2">
        <p className="text-3xl font-semibold">Why Appcrons?</p>
        <p className="text-color-text-secondary text-base">
          Tackling Render's Free Tier Limitations
        </p>
      </div>
      <div className="w-full flex items-start gap-4 ">
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
                className="px-2 pl-4 py-4 text-center border-x-[1px] 
                border-color-border-primary rounded-tl-md"
              >
                Limitations
              </th>

              <th
                className="px-2 py-4 text-center border-r-[1px] 
                border-color-border-primary rounded-tr-md"
              >
                Solutions
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
                    <p className="text-base text-color-text-primary">
                      {AppCronSolution.limitation.title}
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
                    <p className="text-base text-color-text-primary">
                      {AppCronSolution.solution.title}
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
