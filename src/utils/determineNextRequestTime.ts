import { TApp } from "@/types/app";

export const determineNextRequestTime = (app: TApp): string => {
  if (app.isDisabled) {
    return "N/A";
  }

  if (!app.requests || app.requests.length === 0) {
    return "N/A";
  }

  const requestIntervalMinutes = parseInt(app.requestInterval, 10);
  const lastRequestStartedAt = new Date(app.requests[0].startedAt);
  const nextRequestTime = new Date(
    lastRequestStartedAt.getTime() + requestIntervalMinutes * 60000
  );

  if (app.requestTimes && app.requestTimes.length > 0) {
    const currentTime = new Date();
    const currentTimeInMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();

    for (const requestTime of app.requestTimes) {
      const startParts = requestTime.start.split(":");
      const endParts = requestTime.end.split(":");

      const startInMinutes =
        parseInt(startParts[0], 10) * 60 + parseInt(startParts[1], 10);
      const endInMinutes =
        parseInt(endParts[0], 10) * 60 + parseInt(endParts[1], 10);

      if (
        currentTimeInMinutes >= startInMinutes &&
        currentTimeInMinutes <= endInMinutes
      ) {
        const nextRequestInMinutes =
          nextRequestTime.getHours() * 60 + nextRequestTime.getMinutes();
        if (nextRequestInMinutes > endInMinutes) {
          return nextRequestTime.toISOString();
        }
      }
    }
  }

  return nextRequestTime.toISOString();
};
