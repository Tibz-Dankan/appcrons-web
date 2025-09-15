import React from "react";
import { Metadata } from "next";
import { DashboardLayout } from "@/app/layouts/DashboardLayout";
import { Session } from "@/lib/session";
import { AdminService } from "@/services/admin.service";
import UserApps from "./UserApps";

type Props = { params: { userId: string } };

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const userId = params.userId;

  const session = new Session().get();
  const accessToken = session?.accessToken!;
  let username: string = "Username";

  try {
    const response = await new AdminService().getUser({
      userId: userId,
      accessToken: accessToken,
    });

    username = response.data?.name!;
  } catch (error) {
    console.log("error fetching app details: ", error);
  }

  return {
    title: username,
  };
};

const Page: React.FC = () => {
  return (
    <DashboardLayout>
      <UserApps />
    </DashboardLayout>
  );
};

export default Page;
