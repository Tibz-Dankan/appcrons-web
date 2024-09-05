import React from "react";
import { Metadata } from "next";
import { DocsLayout } from "@/app/layouts/DocsLayout";
import { Link } from "@/lib/router-events";
import { AppImage } from "@/app/shared/AppImage";

export const metadata: Metadata = {
  title: "Add Request Time Frame for an Application on Appcrons",
  description: "Add a Request Time Frame for an application on Appcrons",
};

const Page: React.FC = () => {
  return (
    <DocsLayout>
      <div className="w-full min-h-[50vh] space-y-8">
        <div className="space-y-2">
          <h2 className="text-lg">What is a Request Time Frame (RTF)?</h2>
          <p>
            A Request Time Frame (RTF) is a time range during which an
            application receives requests. For example, an RTF might be from
            6:00 AM to 11:00 PM. If an application has an RTF of 6:00 AM to
            11:00 PM, it means the application can only receive requests between
            6:00 AM and 11:00 PM each day.
          </p>
          <p>
            The Request Time Frame (RTF) is based on the timezone specified when
            adding the RTF. The 6:00 AM - 11:00 PM example above would be in the
            local time of the timezone provided. RTFs can be modified or deleted
            as needed.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg">
            Why Should I Add a Request Time Frame (RTF) to My Application?
          </h2>
          <p>
            Render provides each account with 750 free compute hours each month,
            which is equivalent to running one backend server continuously
            throughout the month without downtime. If you have multiple servers
            on the same free account running all the time, you are likely to
            exhaust your free compute hours within a few days, leading to Render
            shutting down all your apps until the next calendar month begins.
          </p>
          <p>
            To stay within the 750-hour limit, Appcrons offers the RTF feature,
            allowing you to specify request time frames during which your
            application server can have guaranteed uptime.
          </p>
          <p>
            <span className="mr-2">Note:</span>
            We highly recommend having one application server that runs all the
            time or for most of the day per Render account.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg">Add a Request Time Frame</h2>
          <p>
            To add a request time frame for an application, go to the
            application details page, and click the button labeled "New" located
            on the "Request Time Frame" card.
          </p>
          <div>
            <AppImage
              src="/docs/rtf-card-light.png"
              lightModeSRC="/docs/rtf-card-light.png"
              darkModeSRC="/docs/rtf-card-dark.png"
              width={450}
              height={250}
              className="mt-4 w-3/5 object-contain"
              alt="RTF card"
            />
          </div>
          <div>
            <p className="my-8">
              Then, select the timezone, start time, and end time, and submit
              your choices.
            </p>
          </div>
          <AppImage
            src="/docs/request-time-frame-light.png"
            lightModeSRC="/docs/request-time-frame-light.png"
            darkModeSRC="/docs/request-time-frame-dark.png"
            width={450}
            height={250}
            className="mt-4"
            alt="Request time frame"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl">Useful Resources</h2>
          <div className="flex flex-col gap-1">
            <Link
              href="/docs/get-started"
              className="text-blue-500 hover:underline focus:underline"
            >
              Get Started on Appcrons
            </Link>
            <Link
              href="/docs/add-application"
              className="text-blue-500 hover:underline focus:underline"
            >
              Add Your Application on Appcrons
            </Link>
            <Link
              href="/docs/how-appcrons-work"
              className="text-blue-500 hover:underline focus:underline"
            >
              How Appcrons Works
            </Link>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
};

export default Page;
