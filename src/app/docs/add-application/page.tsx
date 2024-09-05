import React from "react";
import { Metadata } from "next";
import { DocsLayout } from "@/app/layouts/DocsLayout";
import { Link } from "@/lib/router-events";
import { AppImage } from "@/app/shared/AppImage";

export const metadata: Metadata = {
  title: "Add an application on Appcrons",
  description: "Add an application on Appcrons",
};

const Page: React.FC = () => {
  return (
    <DocsLayout>
      <div className="w-full min-h-[50vh] space-y-8">
        <div className="space-y-2">
          <p className="mt-2">
            To add an application, click the '+New' button in the navbar. This
            process involves three steps: adding application information,
            enabling the application, and finishing.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg">Step 1: Add New Application</h3>
          <p>
            In this step, you need to provide basic information, including the
            application name, URL Endpoint, and Request Interval. The URL
            Endpoint should be a path like
            <span className="border-[1px] border-color-border-primary mx-1 px-1 rounded">
              https://appname.onrender.com/active
            </span>
            that points to a
            <span className="border-[1px] border-color-border-primary mx-1 px-1 rounded">
              GET request
            </span>
            API endpoint. The endpoint should return a status code of
            <span className="border-[1px] border-color-border-primary mx-1 px-1 rounded">
              200
            </span>{" "}
            without processing anything. This is where Appcrons will send
            requests. The Request Interval is set in minutes.
          </p>
          <div>
            <AppImage
              src="/docs/add-new-app-step-light.png"
              lightModeSRC="/docs/add-new-app-step-light.png"
              darkModeSRC="/docs/add-new-app-step-dark.png"
              width={1350}
              height={600}
              className="mt-4"
              alt="Add new application step"
            />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg">Step 2: Enable Application</h3>
          <p>
            After adding the application, it's disabled by default, meaning it
            won't receive requests from Appcrons. You need to enable it in this
            step to start receiving requests.
          </p>
          <div>
            <AppImage
              src="/docs/enable-app-step-light.png"
              lightModeSRC="/docs/enable-app-step-light.png"
              darkModeSRC="/docs/enable-app-step-dark.png"
              width={1350}
              height={600}
              className="mt-4"
              alt="Enable application step"
            />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg">Step 3: Finish</h3>
          <p>
            Congratulations! You have successfully added your first application
            on Appcrons. Click the "Finish" button to proceed to the application
            details page.
          </p>
          <div>
            <AppImage
              src="/docs/finish-app-step-light.png"
              lightModeSRC="/docs/finish-app-step-light.png"
              darkModeSRC="/docs/finish-app-step-dark.png"
              width={1350}
              height={600}
              className="my-4"
              alt="Finish application step"
            />
          </div>
          <p className="mt-4">
            If you have multiple applications on the same Render account,
            consider adding a{" "}
            <Link
              href="/docs/add-request-time-frame"
              className="text-blue-500 hover:underline focus:underline"
            >
              Request Time Frame (RTF)
            </Link>{" "}
            for your applications.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl">Useful resources</h2>
          <div className="flex flex-col gap-1">
            <Link
              href="/docs/add-request-time-frame"
              className="text-blue-500 hover:underline focus:underline"
            >
              Add Request Time Frame for your application
            </Link>
            <Link
              href="/docs/how-appcrons-work"
              className="text-blue-500 hover:underline focus:underline"
            >
              How Appcrons works
            </Link>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
};

export default Page;
