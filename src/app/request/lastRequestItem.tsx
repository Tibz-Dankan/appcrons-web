"use client";

import { elapsedTime } from "@/utils/elapsedTime";
import React, { useEffect, useState } from "react";

interface LastRequestItemProps {
  startedAt: string;
}

export const LastRequestItem: React.FC<LastRequestItemProps> = (props) => {
  const [elapseTime, setElapseTime] = useState(elapsedTime(props.startedAt));

  useEffect(() => {
    const timerId = setTimeout(() => {
      setElapseTime(elapsedTime(props.startedAt));
    }, 60000);

    return () => clearTimeout(timerId);
  }, [elapseTime]);

  // TODO:To include a in-progress real-time visualization element and functionality

  return <div>{elapseTime}</div>;
};
