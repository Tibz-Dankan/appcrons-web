import React from "react";
import { Metadata } from "next";
import { DocsLayout } from "@/app/layouts/DocsLayout";
import { Link } from "@/lib/router-events";
import { AppImage } from "@/app/shared/AppImage";

export const metadata: Metadata = {
  title: "Get Started on Appcrons",
  description: "Get started on Appcrons",
};

const Page: React.FC = () => {
  return (
    <DocsLayout>
      <div className="w-full min-h-[50vh] space-y-8">
        <p>
          If you are new to Appcrons, you will first need to create an account
          by visiting the
          <Link
            href="/auth/signup"
            className="text-blue-500 hover:underline focus:underline mx-2"
          >
            signup page.
          </Link>
          It only takes a few seconds.
        </p>
        <div className="space-y-2">
          <h2 className="text-xl">Add Your First Application</h2>
          <p>
            After successfully creating an account, you will be redirected to
            the dashboard page where you can add your first application.
          </p>
          <div className="">
            <AppImage
              src="/docs/welcome-light.png"
              lightModeSRC="/docs/welcome-light.png"
              darkModeSRC="/docs/welcome-dark.png"
              width={1350}
              height={600}
              className="mt-4"
              alt="welcome"
            />
          </div>
          <p className="mt-2">
            To add an application, you can click buttons labeled either '+New'
            or '+New Application'. There are three steps involved in this
            process.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg">Step 1: Add a New Application</h3>
          <p>
            This step involves adding basic information about the application
            such as the application name, URL endpoint, and request interval.
            The URL endpoint should be a path like
            <span className="border-[1px] border-color-border-primary mx-1 px-1 rounded">
              https://appname.onrender.com/active
            </span>
            that points to a
            <span className="border-[1px] border-color-border-primary mx-1 px-1 rounded">
              GET request
            </span>
            API endpoint that returns a status code of
            <span className="border-[1px] border-color-border-primary mx-1 px-1 rounded">
              200
            </span>
            . It shouldn't process anything. The endpoint is where Appcrons
            makes requests, and the request interval is always in minutes.
          </p>
          <div>
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
          <h3 className="text-lg">Step 2: Enable the Application</h3>
          <p>
            By enabling an application, it becomes able to receive requests from
            Appcrons. When an application is added for the first time, it is
            disabled by default, meaning it cannot receive requests. You need to
            enable it in this step.
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
            If you have reached this step, congratulations! You have
            successfully added your first application on Appcrons. Go ahead and
            click the button labeled "Finish," which will take you to the
            application details page.
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
          <div>
            <p className="mt-4">
              If you want to have multiple applications on the same Render
              account, consider adding a{" "}
              <Link
                href="/docs/add-request-time-frame"
                className="text-blue-500 hover:underline focus:underline"
              >
                Request Time Frame (RTF)
              </Link>{" "}
              for your application.
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl">Useful Resources</h2>
          <div className="flex flex-col gap-1">
            <Link
              href="/docs/add-request-time-frame"
              className="text-blue-500 hover:underline focus:underline"
            >
              Add a Request Time Frame for your application
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
