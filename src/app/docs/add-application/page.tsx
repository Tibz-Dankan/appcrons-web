import React from "react";
import { Metadata } from "next";
import { DocsLayout } from "@/app/layouts/DocsLayout";

export const metadata: Metadata = {
  title: "Add application on appcrons",
  description: "Add application on appcrons",
};

const Page: React.FC = () => {
  return (
    <DocsLayout>
      <div className="w-[100vh] h-[100vh] grid place-items-center">
        How Appcrons works
      </div>
    </DocsLayout>
  );
};

export default Page;
