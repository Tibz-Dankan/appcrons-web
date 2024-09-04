import React from "react";
import { Metadata } from "next";
import { DocsLayout } from "@/app/layouts/DocsLayout";

export const metadata: Metadata = {
  title: "Add request time frame for an application on appcrons",
  description: "Add request time frame for an application on appcrons",
};

const Page: React.FC = () => {
  return (
    <DocsLayout>
      <div className="w-[100vh] h-[100vh] grid place-items-center">
        Add request time frame for an application
      </div>
    </DocsLayout>
  );
};

export default Page;
