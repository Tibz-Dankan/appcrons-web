"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks/redux";
import { Spinner } from "@/app/shared/loader/Spinner";
import { Notification } from "@/app/shared/Notification";
import { PageAuthWrapper } from "@/app/auth/PageAuthWrapper";
import { AdminService } from "@/services/admin.service";
import { TCountryDistributionItem } from "@/types/admin";
import { countryCodeToFlagEmoji } from "@/utils/countryCodeToFlagEmoji";
import { addCommasToNumber } from "@/utils/addCommaToNumber";

const Countries: React.FC = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["user-country-distribution"],
    queryFn: () =>
      new AdminService().getCountryDistribution({
        accessToken: accessToken,
      }),
  });

  const countries: TCountryDistributionItem[] = data?.data ?? [];

  const isLastElement = (list: any[], index: number): boolean => {
    return index === list.length - 1;
  };

  if (isPending) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Notification
          type={"error"}
          message={error.message}
          onClose={() => {}}
        />
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center">
        <span>No user location data on Appcrons yet!</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[90vh] flex items-start justify-center">
      <div
        className="w-full px-4 md:px-8 pt-2 max-w-[1280px] mt-8 space-y-8
        overflow-x-hidden"
      >
        <h1 className="text-xl font-semibold text-color-text-primary">
          User Country Distribution
        </h1>
        <div className="overflow-x-auto">
          <table
            className="border-separate border-spacing-0 w-full
             overflow-x-auto"
          >
            <thead>
              <tr
                className="[&>*]:bg-color-bg-secondary [&>*]:border-y-[1px]
                 [&>*]:border-color-border-primary text-sm"
              >
                <th
                  className="px-2 pl-4 py-4 text-start border-l-[1px]
                  border-color-border-primary rounded-tl-md"
                >
                  <span>Flag</span>
                </th>
                <th className="px-2 py-4 text-start">
                  <span>Country</span>
                </th>
                <th
                  className="px-2 py-4 text-start border-r-[1px]
                  border-color-border-primary rounded-tr-md"
                >
                  <span>Number of Users</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {countries.map((item, index) => {
                return (
                  <tr
                    className="h-12 [&>*]:border-b-[1px]
                    [&>*]:border-color-border-primary text-sm"
                    key={index}
                  >
                    <td
                      className={`px-2 pl-4 border-l-[1px]
                      border-color-border-primary text-lg
                      ${isLastElement(countries, index) && "rounded-bl-md"}`}
                    >
                      <span>{countryCodeToFlagEmoji(item.countryCode)}</span>
                    </td>
                    <td className="px-2">
                      <span>{item.country}</span>
                    </td>
                    <td
                      className={`px-2 border-r-[1px] border-color-border-primary
                      ${isLastElement(countries, index) && "rounded-br-md"}`}
                    >
                      {addCommasToNumber(item.userCount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PageAuthWrapper(Countries);
