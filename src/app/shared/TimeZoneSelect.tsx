import React, { useState, useEffect } from "react";
import timeZones from "@/app/shared/data/timezone.json";
import { TriangleDownIcon } from "./Icons/TriangleDownIcon";
import { Timezone } from "@/utils/timezone";

interface TimeZoneSelectProps {
  onSelect: (timeZone: string) => void;
  defaultTimeZone?: string;
}

export const TimeZoneSelect: React.FC<TimeZoneSelectProps> = (props) => {
  const options = timeZones.allTimeZones;
  const timeZoneInstance = new Timezone(options);
  const defaultTimeZone = props.defaultTimeZone ? props.defaultTimeZone : "";

  const [value, setValue] = useState(
    defaultTimeZone ? defaultTimeZone : timeZoneInstance.getDeviceTimeZone()
  );

  useEffect(() => {
    props.onSelect(value);
  }, [value]);

  const onChangeHandler = (event: any) => {
    setValue(() => event.target.value);
    props.onSelect(event.target.value);
  };

  return (
    <div
      className="relative flex flex-col items-start 
       justify-center gap-1 w-full text-color-text-primary"
    >
      <div className="w-full relative">
        <select
          onChange={onChangeHandler}
          value={value}
          className="appearance-none p-2 outline-none rounded-md border-[1px]
           border-color-border-primary focus:border-[1px] focus:border-primary
           transition-all text-sm w-full focus:outline-none
           focus:shadow-[0px_0px_0px_4px_rgba(12,166,120,0.3)]
           text-color-text-primary bg-color-bg-primary"
        >
          {options.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
        <div
          className="flex items-center justify-center absolute top-0 
           right-2 h-full"
        >
          <TriangleDownIcon className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};
