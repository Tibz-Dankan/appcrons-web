import React from "react";
import { Metadata } from "next";
import { DocsLayout } from "@/app/layouts/DocsLayout";

export const metadata: Metadata = {
  title: "Get started on appcrons",
  description: "Get started on appcrons",
};

const Page: React.FC = () => {
  return (
    <DocsLayout>
      <div className="w-[100vh] h-[100vh] grid place-items-center">
        Get started on appcrons
      </div>
    </DocsLayout>
  );
};

export default Page;
