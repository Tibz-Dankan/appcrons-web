import React, { useEffect, useState } from "react";
import { getCurrentTimeInTimeZone } from "@/utils/getCurrentTimeInTimeZone";
import { ToolTip } from "@/app/shared/ToolTip";
import { InfoIcon } from "@/app/shared/Icons/InfoIcon";

interface CurrentTimeInTimeZoneProps {
  timeZone: string;
}

export const CurrentTimeInTimeZone: React.FC<CurrentTimeInTimeZoneProps> = (
  props
) => {
  const timeZone = props.timeZone;
  const time = getCurrentTimeInTimeZone(timeZone);
  const [currentTime, setCurrentTime] = useState<string>(time);

  // update currentTime value at the
  // start of every minute and after
  // every 30 seconds
  useEffect(() => {
    const updateCurrentTimeInTimeZone = () => {
      if (!timeZone) return;
      setCurrentTime(() => getCurrentTimeInTimeZone(timeZone));
    };

    const now = new Date();
    const delayToNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const initialTimeoutId = setTimeout(() => {
      updateCurrentTimeInTimeZone();
      const intervalId = setInterval(updateCurrentTimeInTimeZone, 30000);

      return () => clearInterval(intervalId);
    }, delayToNextMinute);

    return () => clearTimeout(initialTimeoutId);
  }, [timeZone, setCurrentTime]);

  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      <span className="text-color-text-secondary">{currentTime}</span>
      <span data-tooltip-id="timezone-current-time">
        <InfoIcon className="w-[18px] h-[18px] text-color-text-secondary" />
      </span>
      <ToolTip
        id={"timezone-current-time"}
        content={
          <span className="w-full text-sm font-[500] text-center">
            This is the current time in the time zone {`${timeZone}`}
          </span>
        }
        place="bottom"
        width="176px"
      />
    </div>
  );
};
