import React from "react";
import { Card } from "../shared/Card";
import { Spinner } from "../shared/loader/Spinner";
import { Notification } from "@/app/shared/Notification";
import { useAppSelector } from "@/hooks/redux";
import { useQuery } from "@tanstack/react-query";
import { AdminService } from "@/services/admin.service";
import { TStatsAPIData } from "@/types/admin";
import { addCommasToNumber } from "@/utils/addCommaToNumber";
import UserIcon from "../shared/Icons/UserIcon";
import { SettingsIcon } from "../shared/Icons/SettingsIcon";
import { RequestIcon } from "../shared/Icons/RequestIcon";
import { UserGroupIcon } from "../shared/Icons/UserGroupIcon";
import { useRouter } from "@/lib/router-events";
import { clientURL } from "@/constants";

export const Statistics: React.FC = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const router = useRouter();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["appcrons-statistics"],
    queryFn: () =>
      new AdminService().getStats({
        accessToken: accessToken,
      }),
  });

  const stats: TStatsAPIData = data?.data ?? {
    userCount: 0,
    appCount: 0,
    requestCount: 0,
    countryCount: 0,
  };

  const navigateToCountriesPage = () => {
    router.push(`${clientURL}/admin/users/countries`);
  };

  const getValue = (valueInt: number) => {
    if (valueInt === 0) return "None";
    return addCommasToNumber(valueInt);
  };

  if (isPending) {
    return (
      <div className="w-full h-[20vh] flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[20vh] flex items-center justify-center">
        <Notification
          type={"error"}
          message={error.message}
          onClose={() => {}}
        />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col md:flex-row items-start justify-start gap-4
      [&>*]:min-h-32 [&>*]:min-w-56 [&>*]:shadow-md w-full"
    >
      <Card
        className="flex flex-col justify-between gap-4 w-full
        bg-color-bg-tertiary/0 border-[1px] border-color-border-primary"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm text-color-text-secondary">
            Total Number of Users
          </p>
          <span
            className="text-color-text-primary bg-primary/15
            rounded-md p-2"
          >
            <UserIcon className="text-primary w-5 h-5" />
          </span>
        </div>
        <div className="flex flex-col gap-2 text-muted-clr">
          <p className="font-semibold text-3xl">{getValue(stats.userCount)}</p>
        </div>
      </Card>
      <Card
        className="flex flex-col justify-between gap-4 w-full
        bg-color-bg-tertiary/0 border-[1px] border-color-border-primary"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm text-color-text-secondary">All Applications</p>
          <span
            className="text-color-text-primary bg-primary/15
            rounded-md p-2"
          >
            <SettingsIcon className="text-lg text-primary w-5 h-5" />
          </span>
        </div>
        <div className="flex flex-col gap-2 text-muted-clr">
          <p className="font-semibold text-3xl">{getValue(stats.appCount)}</p>
        </div>
      </Card>
      <Card
        className="flex flex-col justify-between gap-4 w-full
        bg-color-bg-tertiary/0 border-[1px] border-color-border-primary"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm text-color-text-secondary">
            Number of Requests
          </p>
          <span
            className="text-color-text-primary bg-primary/15
            rounded-md p-2"
          >
            <RequestIcon className="text-primary w-5 h-5" />
          </span>
        </div>
        <div className="flex flex-col gap-2 text-muted-clr">
          <p className="font-semibold text-3xl">
            {getValue(stats.requestCount)}
          </p>
        </div>
      </Card>
      <div
        className="w-full h-auto rounded-md p-4 bg-color-bg-secondary shadow
        flex flex-col justify-between gap-4 cursor-pointer
        bg-color-bg-tertiary/0 border-[1px] border-color-border-primary
        hover:border-primary transition-colors"
        onClick={navigateToCountriesPage}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm text-color-text-secondary">
            User Country Distribution
          </p>
          <span
            className="text-color-text-primary bg-primary/15
            rounded-md p-2"
          >
            <UserGroupIcon className="text-primary w-5 h-5" />
          </span>
        </div>
        <div className="flex flex-col gap-2 text-muted-clr">
          <p className="font-semibold text-3xl">
            {getValue(stats.countryCount)}
          </p>
        </div>
      </div>
    </div>
  );
};
