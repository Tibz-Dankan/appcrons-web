import React from "react";
import { Metadata } from "next";
// import { PageContentLoader } from "@/app/shared/loader/PageContentLoader";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Appcrons official documentation",
};

const Page: React.FC = () => {
  return (
    <div className="w-[100vh] h-[100vh] grid place-items-center">
      {/* <PageContentLoader /> */}
      Documentation
    </div>
  );
};

export default Page;
