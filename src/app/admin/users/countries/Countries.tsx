"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks/redux";
import { Spinner } from "@/app/shared/loader/Spinner";
import { Notification } from "@/app/shared/Notification";
import { PageAuthWrapper } from "@/app/auth/PageAuthWrapper";
import { AdminService } from "@/services/admin.service";
import { TCountryDistributionItem } from "@/types/admin";
import { countryCodeToFlagEmoji } from "@/utils/countryCodeToFlagEmoji";
import { addCommasToNumber } from "@/utils/addCommaToNumber";
import { CountryUsersList } from "./CountryUsersList";
import { ChevronDownIcon } from "@/app/shared/Icons/ChevronDownIcon";
import { ChevronUpIcon } from "@/app/shared/Icons/ChevronUpIcon";

const Countries: React.FC = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["user-country-distribution"],
    queryFn: () =>
      new AdminService().getCountryDistribution({
        accessToken: accessToken,
      }),
  });

  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

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
                const users = item.users ?? [];
                const hasUsers = users.length > 0;
                const isExpanded = expanded.has(index);
                const rowIsLast =
                  isLastElement(countries, index) && !isExpanded;

                return (
                  <React.Fragment key={index}>
                    <tr
                      className={`h-12 [&>*]:border-b-[1px]
                      [&>*]:border-color-border-primary text-sm
                      ${hasUsers && "cursor-pointer"}`}
                      onClick={() => hasUsers && toggleExpanded(index)}
                    >
                      <td
                        className={`px-2 pl-4 border-l-[1px]
                        border-color-border-primary text-lg
                        ${rowIsLast && "rounded-bl-md"}`}
                      >
                        <span>
                          {countryCodeToFlagEmoji(item.locInfo.countryCode)}
                        </span>
                      </td>
                      <td className="px-2">
                        <span>{item.locInfo.country || "Unknown"}</span>
                      </td>
                      <td
                        className={`px-2 border-r-[1px] border-color-border-primary
                        ${rowIsLast && "rounded-br-md"}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span>{addCommasToNumber(item.userCount)}</span>
                          {hasUsers &&
                            (isExpanded ? (
                              <ChevronUpIcon className="w-4 h-4" />
                            ) : (
                              <ChevronDownIcon className="w-4 h-4" />
                            ))}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td
                          colSpan={3}
                          className={`border-b-[1px] border-l-[1px] border-r-[1px]
                          border-color-border-primary p-0
                          ${
                            isLastElement(countries, index) && "rounded-b-md"
                          }`}
                        >
                          <CountryUsersList users={users} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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
