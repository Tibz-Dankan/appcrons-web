import { TApp, TRequestTime } from "@/types/app";
import moment from "moment-timezone";
import { AppDate } from "@/utils/date";
import { TDateStatus } from "@/types/date";

const sortRequestTimes = (requestTimes: TRequestTime[]): TRequestTime[] => {
  const sortedRequestTimes = [...requestTimes];

  return sortedRequestTimes.sort((a, b) => {
    const timeA = a.start.split(":").map(Number);
    const timeB = b.start.split(":").map(Number);

    for (let i = 0; i < timeA.length; i++) {
      if (timeA[i] !== timeB[i]) {
        return timeA[i] - timeB[i];
      }
    }

    return 0;
  });
};

export const determineNextRequestTime = (
  app: TApp
): { date: string; status: TDateStatus } => {
  if (app.isDisabled) {
    return { date: "N/A", status: "unknown" };
  }

  if (!app.requests || app.requests.length === 0) {
    return { date: "N/A", status: "unknown" };
  }

  const hasRequests = !!app.requests && app.requests.length > 0;
  const hasRequestTimes = !!app.requestTimes && app.requestTimes.length > 0;

  const requestIntervalMinutes = parseInt(app.requestInterval, 10);
  const lastRequestStartedAt = new Date(app.requests[0].startedAt);

  // get the timezone
  const deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const appTimezone = (app.requestTimes &&
    app?.requestTimes[0]?.timeZone) as string;
  const timezone = hasRequestTimes ? appTimezone : deviceTimezone;

  // get currentTime in the application timezone
  const currentTimeStringWithTimezone = moment(new Date())
    .tz(timezone)
    .format();
  const currentTime = new Date(currentTimeStringWithTimezone);
  console.log("application name:", app.name);
  console.log("currentTime:", currentTime);
  console.log("timezone:", timezone);
  console.log("requestTimes:", app.requestTimes);

  // get nextRequestTime in the application timezone
  const nextRequestDate = new Date(
    lastRequestStartedAt.getTime() + requestIntervalMinutes * 60000
  );
  const nextRequestTimeStringWithTimezone = moment(nextRequestDate, true)
    .tz(timezone)
    .format();
  const nextRequestTime = new Date(nextRequestTimeStringWithTimezone);

  console.log("nextRequestTime:", nextRequestTime);

  const nextRequestInMinutes =
    nextRequestTime.getHours() * 60 + nextRequestTime.getMinutes();
  const currentTimeInMinutes =
    currentTime.getHours() * 60 + currentTime.getMinutes();

  if (hasRequests && !hasRequestTimes) {
    if (nextRequestInMinutes - currentTimeInMinutes > 15) {
      return { date: "N/A", status: "unknown" };
    }
    // TODO: to create a function for determining whether its 2moro
    return { date: nextRequestTime.toISOString(), status: "today" };
  }

  const requestTimes = sortRequestTimes(app.requestTimes!);

  for (let i = 0; i < requestTimes.length; i++) {
    const startParts = requestTimes[i].start.split(":");
    const endParts = requestTimes[i].end.split(":");

    const startInMinutes =
      parseInt(startParts[0], 10) * 60 + parseInt(startParts[1], 10);
    const endInMinutes =
      parseInt(endParts[0], 10) * 60 + parseInt(endParts[1], 10);

    const isInBetweenCurrentRequestTime =
      currentTimeInMinutes >= startInMinutes &&
      currentTimeInMinutes <= endInMinutes;

    if (isInBetweenCurrentRequestTime) {
      if (nextRequestInMinutes <= endInMinutes) {
        return { date: nextRequestTime.toISOString(), status: "today" };
      }
    }

    const isLastRequestTime = requestTimes.length === i + 1;
    // nextStartParts is from the first
    // element of the array if the current element
    // in iteration is last
    const nextStartParts = isLastRequestTime
      ? requestTimes[0].start.split(":")
      : requestTimes[i + 1]?.start.split(":");
    const nextStartInMinutes =
      parseInt(nextStartParts[0], 10) * 60 + parseInt(nextStartParts[1], 10);

    const isInBetweenTwoDifferentRequestTimes =
      currentTimeInMinutes > endInMinutes &&
      currentTimeInMinutes < nextStartInMinutes;

    // next element start as the nextRequestTime
    if (isInBetweenTwoDifferentRequestTimes) {
      const nextRequestTimeISOString = new AppDate(
        nextRequestTime
      ).add24HourTimeFormatToDate(requestTimes[i + 1].start);
      return { date: nextRequestTimeISOString, status: "today" };
    }

    const lastElementEndInMinutes = isLastRequestTime ? endInMinutes : 0;
    if (isLastRequestTime && lastElementEndInMinutes !== 0) {
      const nextRequestTimeISOString = new AppDate(
        nextRequestTime
      ).add24HourTimeFormatToDate(requestTimes[0].start);
      return { date: nextRequestTimeISOString, status: "tomorrow" };
    }
  }

  return { date: "N/A", status: "unknown" };
};
