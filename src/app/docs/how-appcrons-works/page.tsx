import React from "react";
import { Metadata } from "next";
import { DocsLayout } from "@/app/layouts/DocsLayout";
import { Link } from "@/lib/router-events";

export const metadata: Metadata = {
  title: "How Appcrons works",
  description: "How Appcrons works",
};

const Page: React.FC = () => {
  return (
    <DocsLayout>
      <div className="w-full min-h-[50vh] space-y-8">
        <p>
          Before you can find out how Appcrons works, it's important to first
          know why, it was created in the first place to gain context for better
          understanding.
        </p>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Why was Appcrons created?</h2>
          <p>
            The main and sole purpose of Appcrons, is to keep your backend
            instances/servers hosted on Render's free/hobby plan active. But
            why? It turns out that Render usually shuts down instances/servers
            on this plan after 15 minutes if inactivity and booting up an
            instance from it's down state on average takes 50 seconds and
            beyond. This can really be frustrating incases when you need your
            server to be available all the time or for a specific period of
            through out the day. Appcrons does an excellent job to resolve this
            problem.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">How Appcrons works</h2>
          <p>
            Now that you know why appcrons was created, lets divide into how it
            works. Appcrons works.
          </p>
          <p>
            Appcrons sends automated requests to your backend instance at
            intervals of 5, 10 and 15 minutes. Requests can be sent for 24 hours
            or for a specific time frame through out the day. Additionally
            requests can be stopped at anytime for any given application as per
            the user's choice. This allows developers to have control on the
            availability of their free backend servers hence improving user
            experience.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Useful resources</h2>
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
              Add request time frame for your application
            </Link>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
};

export default Page;
