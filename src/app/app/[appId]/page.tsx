import React from "react";
import type { Metadata } from "next";
import App from "@/app/app/[appId]/app";
import { AppService } from "@/services/app.service";
import { Session } from "@/lib/session";
import { performance } from "perf_hooks";

type Props = { params: { appId: string } };

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const appId = params.appId;

  const session = new Session().get();
  const accessToken = session?.accessToken!;
  let appName: string = "Application";

  try {
    const startTime = performance.now();

    const response = await new AppService().get({
      appId: appId,
      accessToken: accessToken,
    });

    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    console.log(`Time taken to fetch app details: ${timeTaken} milliseconds`);

    appName = response.data?.app?.name!;
  } catch (error) {
    console.log("error fetching app details: ", error);
  }

  return {
    title: appName,
  };
};

const Page: React.FC = () => {
  return <App />;
};

export default Page;
