import React from "react";
import { Card } from "@/app/shared/Card";

export const Features: React.FC = () => {
  const features = [
    {
      title: "Automated Requests",
      description:
        "Keep your backend servers awake with regular pings. Appcrons sends automated HTTP requests at intervals to ensure your applications do not enter an idle state, eliminating delays caused by cold starts.",
    },
    {
      title: "Custom Scheduling",
      description:
        "Set specific time frames and intervals for requests. Customize the frequency of requests and define active hours, ensuring optimal usage within free limits.",
    },
    {
      title: "Time Zone Support",
      description:
        "Manage requests based on your local time zone. Schedule requests that align with your operating hours, no matter where you or your servers are located.",
    },
    {
      title: "Enable/Disable Apps",
      description:
        "Easily manage which applications are kept active. Enable or disable monitoring for individual applications, optimizing resource allocation and keeping critical apps awake.",
    },
  ];

  return (
    <div className="w-full mt-16 space-y-16">
      <div className="w-full text-center space-y-2">
        <p className="text-3xl font-semibold">Features</p>
        <p className="text-color-text-secondary text-base">
          Discover how Appcrons enhances your server uptime
        </p>
      </div>
      <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="space-y-4 bg-color-bg-secondary  p-8 rounded-md rounded-b-xl
            relative before:absolute before:top-0 before:left-0 before:w-full
            before:h-2 before:rounded-t-2xl before:bg-primary"
          >
            <p className="text-xl text-color-text-primary text-center">
              {feature.title}
            </p>
            <p className="text-center text-sm text-color-text-secondary">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
