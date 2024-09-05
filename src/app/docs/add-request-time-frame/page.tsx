import React from "react";
import { Metadata } from "next";
import { DocsLayout } from "@/app/layouts/DocsLayout";
import { Link } from "@/lib/router-events";
import { AppImage } from "@/app/shared/AppImage";

export const metadata: Metadata = {
  title: "Add request time frame for an application on appcrons",
  description: "Add request time frame for an application on appcrons",
};

const Page: React.FC = () => {
  return (
    <DocsLayout>
      <div className="w-full min-h-[50vh] space-y-8">
        <div className="space-y-2">
          <h2 className="text-lg">What is Request Time Frame(RTF)?</h2>
          <p>
            Request Time Frame(RTF), is time range in which an application
            receives requests. An example of RFT is 6:00AM - 11:00PM. If an
            application has a RTF of 6:00AM to 11:00PM, it implies that the
            application can only receive requests starting from 6:00AM to
            11:00PM in a day.
          </p>
          <p>
            Request Time Frame(RTF) is timezone based meaning the 6:00AM -
            11:00PM example above would be the local time of the timezone that
            was provided when adding the RTF. RTFs can be modified and deleted.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg">
            Why should I add Request Time Frame(RTF) to my application?
          </h2>
          <p>
            Render provides each account free 750 hours of compute every month
            which is equivalent to running one backend server through out the
            month without downtime. When you have multiple servers on the same
            free account running all time, you are most likely to finish to your
            free compute time within days and Render shutdown all your apps
            until next calendar month begins.
          </p>
          <p>
            To stay within the limits of 750 hours, Appcrons provides RFT
            feature to allow you provide specific request time frames in which
            your application server can have guaranteed uptime.
          </p>
          <p>
            <span className="mr-2">Note:</span>
            We highly recommend having one application server that runs all time
            or most for the part of day per Render account.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg">Add Request Time Frame</h2>
          <p>
            To add a request time frame for an application, you will need to go
            the application details page, click the button labelled "New"
            located on the "Request Time Frame" card.
          </p>
          <div>
            <AppImage
              src="/docs/rtf-card-light.png"
              lightModeSRC="/docs/rtf-card-light.png"
              darkModeSRC="/docs/rtf-card-dark.png"
              width={450}
              height={250}
              className="mt-4 object-contain"
              alt="rtf-card"
            />
          </div>
          <p className="my-8">
            Then select timezone, start time and End time and submit.
          </p>
          <AppImage
            src="/docs/request-time-frame-light.png"
            lightModeSRC="/docs/request-time-frame-light.png"
            darkModeSRC="/docs/request-time-frame-dark.png"
            width={450}
            height={250}
            className="mt-4"
            alt="request-time-frame"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl">Useful resources</h2>
          <div className="flex flex-col gap-1">
            <Link
              href="/docs/get-started"
              className="text-blue-500 hover:underline focus:underline"
            >
              Get started on Appcrons
            </Link>
            <Link
              href="/docs/add-application"
              className="text-blue-500 hover:underline focus:underline"
            >
              Add your application on Appcrons
            </Link>
            <Link
              href="/docs/how-appcrons-work"
              className="text-blue-500 hover:underline focus:underline"
            >
              How Appcrons work
            </Link>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
};

export default Page;
