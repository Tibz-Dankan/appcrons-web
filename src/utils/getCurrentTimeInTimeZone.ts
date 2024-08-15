export const getCurrentTimeInTimeZone = (timeZone: string): string => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: timeZone,
  };
  return date.toLocaleTimeString("en-US", options);
};
