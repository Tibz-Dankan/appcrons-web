import React from "react";
import { Metadata } from "next";
import { DocsLayout } from "@/app/layouts/DocsLayout";
import { Link } from "@/lib/router-events";
import { AppImage } from "@/app/shared/AppImage";

export const metadata: Metadata = {
  title: "Add application on appcrons",
  description: "Add application on appcrons",
};

const Page: React.FC = () => {
  return (
    <DocsLayout>
      <div className="w-full min-h-[50vh] space-y-8">
        <div className="space-y-2">
          <p className="mt-2">
            To add an application, you can click buttons labelled '+New' in the
            navbar. There are three steps involved in this process and that is
            add application basic information, enable application and finish.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg">Step 1: Add new application</h3>
          <p>
            This step involves adding application basic information such as
            application name, URL Endpoint and Request Interval. URL Endpoint
            should be a path such as
            <span className="border-[1px] border-color-border-primary mx-1 px-1 rounded">
              https://appname.onrender.com/active
            </span>
            that points a
            <span className="border-[1px] border-color-border-primary mx-1 px-1 rounded">
              GET request
            </span>
            API endpoint that returns status code of
            <span className="border-[1px] border-color-border-primary mx-1 px-1 rounded">
              200
            </span>{" "}
            and it shouldn't process anything. The Endpoint is where Appcrons
            makes requests. The request Interval is always in minutes.
          </p>
          <div className="">
            <AppImage
              src="/docs/add-new-app-step-light.png"
              lightModeSRC="/docs/add-new-app-step-light.png"
              darkModeSRC="/docs/add-new-app-step-dark.png"
              width={1350}
              height={600}
              className="mt-4"
              alt="add-new-app-step"
            />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg">Step 2: Enable application</h3>
          <p>
            By enabling an application, it's able to receive requests from
            Appcrons. When an application is added for the first time, it's
            disabled by default in other words an unable to receive requests and
            so it to be enabled in this step.
          </p>
          <div>
            <AppImage
              src="/docs/enable-app-step-light.png"
              lightModeSRC="/docs/enable-app-step-light.png"
              darkModeSRC="/docs/enable-app-step-dark.png"
              width={1350}
              height={600}
              className="mt-4"
              alt="enable-app-step"
            />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg">Step 3: Finish</h3>
          <p>
            If you have reached this step congratulations, you have successfully
            added your first application Appcrons. Go ahead and click button
            labelled "Finish" which leads to the application details page.
          </p>
          <div>
            <AppImage
              src="/docs/finish-app-step-light.png"
              lightModeSRC="/docs/finish-app-step-light.png"
              darkModeSRC="/docs/finish-app-step-dark.png"
              width={1350}
              height={600}
              className="mt-4"
              alt="finish-app-step"
            />
          </div>
          <p className="mt-2">
            If have multiple applications on the same Render Account consider
            adding{" "}
            <Link
              href="/docs/add-request-time-frame"
              className="text-blue-500 hover:underline focus:underline"
            >
              Request Time Frame(RTF)
            </Link>{" "}
            for your application.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Useful resources</h2>
          <div className="flex flex-col gap-1">
            <Link
              href="/docs/add-request-time-frame"
              className="text-blue-500 hover:underline focus:underline"
            >
              Add request time frame for your application
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
