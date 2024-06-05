import { TRequestTime } from "@/types/app";

type TValidationResult = {
  isValid: boolean;
  message: string;
};

export const validateTimeRange = (
  requestTimes: TRequestTime[],
  start: string,
  end: string
): TValidationResult => {
  const parseTime = (time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const startTime = parseTime(start);
  const endTime = parseTime(end);

  for (const requestTime of requestTimes) {
    const existingStartTime = parseTime(requestTime.start);
    const existingEndTime = parseTime(requestTime.end);

    if (
      (startTime >= existingStartTime && startTime < existingEndTime) ||
      (endTime > existingStartTime && endTime <= existingEndTime) ||
      (startTime <= existingStartTime && endTime >= existingEndTime)
    ) {
      return {
        isValid: false,
        message: `The provided time range (${start} - ${end}) overlaps with an existing time range (${requestTime.start} - ${requestTime.end}).`,
      };
    }
  }

  return {
    isValid: true,
    message: "The provided time range is valid",
  };
};
