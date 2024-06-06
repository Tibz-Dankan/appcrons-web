import { TRequestTime } from "@/types/app";
import { convertTo12HourFormat } from "./convertTo 12HourFormat";

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
    return hours * 3600 + minutes * 60 + (seconds || 0);
  };

  const startTime = parseTime(start);
  const endTime = parseTime(end);

  if (startTime === endTime) {
    return {
      isValid: false,
      message: `The start time (${convertTo12HourFormat(
        start
      )}) cannot be equal to the end time (${convertTo12HourFormat(end)}).`,
    };
  }

  if (endTime < startTime) {
    // Special case where the time range spans across midnight
    for (const requestTime of requestTimes) {
      const existingStartTime = parseTime(requestTime.start);
      const existingEndTime = parseTime(requestTime.end);

      if (
        startTime <= existingStartTime ||
        endTime >= existingEndTime ||
        (endTime > 0 && endTime > existingStartTime) ||
        (startTime < 86400 && startTime < existingEndTime)
      ) {
        return {
          isValid: false,
          message: `The provided time range (${convertTo12HourFormat(
            start
          )} - ${convertTo12HourFormat(
            end
          )}) overlaps with an existing time range (${convertTo12HourFormat(
            requestTime.start
          )} - ${convertTo12HourFormat(requestTime.end)}).`,
        };
      }
    }
  }

  for (const requestTime of requestTimes) {
    const existingStartTime = parseTime(requestTime.start);
    const existingEndTime = parseTime(requestTime.end);

    if (startTime === existingStartTime || startTime === existingEndTime) {
      return {
        isValid: false,
        message: `The start time (${convertTo12HourFormat(
          start
        )}) cannot be equal to an existing start time (${convertTo12HourFormat(
          requestTime.start
        )}) or end time (${convertTo12HourFormat(requestTime.end)}).`,
      };
    }

    if (endTime === existingStartTime || endTime === existingEndTime) {
      return {
        isValid: false,
        message: `The end time (${convertTo12HourFormat(
          end
        )}) cannot be equal to an existing start time (${convertTo12HourFormat(
          requestTime.start
        )}) or end time (${convertTo12HourFormat(requestTime.end)}).`,
      };
    }

    if (
      (startTime >= existingStartTime && startTime < existingEndTime) ||
      (endTime > existingStartTime && endTime <= existingEndTime) ||
      (startTime <= existingStartTime && endTime >= existingEndTime)
    ) {
      return {
        isValid: false,
        message: `The provided time range (${convertTo12HourFormat(
          start
        )} - ${convertTo12HourFormat(
          end
        )}) overlaps with an existing time range (${convertTo12HourFormat(
          requestTime.start
        )} - ${convertTo12HourFormat(requestTime.end)}).`,
      };
    }
  }

  return {
    isValid: true,
    message: "The provided time range is valid",
  };
};
