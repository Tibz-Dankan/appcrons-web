import { TRequest } from "@/types/app";
import { convertMillisecondsToSeconds } from "@/utils/convertMillisecondsToSeconds";
import { AppDate } from "@/utils/date";
import { useTheme } from "next-themes";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RequestLineChartProps {
  requests: TRequest[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label text-color-text-primary">{`Time : ${label}`}</p>
        <p className="label text-[#8884d8]">{`Latency : ${payload[0].value} s`}</p>
      </div>
    );
  }

  return null;
};

export const RequestLineChart: React.FC<RequestLineChartProps> = (props) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const chartColors = {
    line: "#8884d8",
    axisLine: isDarkMode ? "#868e96" : "#495057",
    tickLine: isDarkMode ? "#868e96" : "#495057",
    axisLabel: isDarkMode ? "#ced4da" : "#343a40",
  };

  // Sort the requests by startedAt in ascending order
  const sortedRequests = props.requests.sort(
    (a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime()
  );

  const data = sortedRequests.map((request) => {
    const appDate = new AppDate(request.startedAt);
    return {
      name: appDate.time(),
      latency: convertMillisecondsToSeconds(request.duration),
    };
  });

  return (
    <div
      className="w-full h-full p-7 rounded-md border-[1px]
      border-color-border-primary flex items-center justify-center"
    >
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 32, right: 32 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: chartColors.tickLine }}
              axisLine={{ stroke: chartColors.axisLine }}
              tickLine={{ stroke: chartColors.tickLine }}
              label={{
                value: "Time",
                position: "insideBottomRight",
                offset: -20,
                fill: chartColors.axisLabel,
              }}
            />
            <YAxis
              tick={{ fill: chartColors.tickLine }}
              axisLine={{ stroke: chartColors.axisLine }}
              tickLine={{ stroke: chartColors.tickLine }}
              label={{
                value: "Latency (s)",
                angle: -90,
                position: "insideLeft",
                fill: chartColors.axisLabel,
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="latency"
              stroke={chartColors.line}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
