import React from "react";
import { Metadata } from "next";
import { DocsLayout } from "@/app/layouts/DocsLayout";
import { Link } from "@/lib/router-events";

export const metadata: Metadata = {
  title: "How Appcrons Works",
  description: "How Appcrons works",
};

const Page: React.FC = () => {
  return (
    <DocsLayout>
      <div className="w-full min-h-[50vh] space-y-8">
        <p>
          Before understanding how Appcrons works, it's important to first
          understand why it was created. This will provide better context for
          comprehending its purpose.
        </p>
        <div className="space-y-2">
          <h2 className="text-xl">Why Was Appcrons Created?</h2>
          <p>
            The main purpose of Appcrons is to keep your backend
            instances/servers hosted on Render's free or hobby plan active. But
            why? Render typically shuts down instances/servers on this plan
            after 15 minutes of inactivity. Booting up an instance from a down
            state can take an average of 50 seconds or more. This can be
            frustrating when you need your server to be available all the time
            or during specific periods of the day. Appcrons solves this problem
            effectively.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl">How Appcrons Works</h2>
          <p>
            Now that you understand why Appcrons was created, let’s dive into
            how it works. Appcrons sends automated requests to your backend
            instance at intervals of 5, 10, or 15 minutes. Requests can be sent
            for 24 hours or within a specific time frame throughout the day.
            Additionally, requests can be stopped at any time for any given
            application, based on the user’s preferences. This gives developers
            control over the availability of their free backend servers, which
            can significantly improve the user experience.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl">Useful Resources</h2>
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
              Add your first application on Appcrons
            </Link>
            <Link
              href="/docs/add-request-time-frame"
              className="text-blue-500 hover:underline focus:underline"
            >
              Add a request time frame for your application
            </Link>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
};

export default Page;
