import React, { ReactNode } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useTheme } from "next-themes";

interface ToolTipProps {
  id: string;
  place?: "bottom" | "top" | "right" | "left";
  variant?: "success" | "error" | "info" | "warning";
  content: ReactNode;
  element?: ReactNode;
}

/**
 Tooltip id must be applied to the element that triggers tooltip
*/
export const ToolTip: React.FC<ToolTipProps> = (props) => {
  const place = props.place ? props.place : "bottom";
  const variant = props.variant ? props.variant : undefined;
  const hasElement = !!props.element;

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className="flex items-center justify-center">
      {hasElement && props.element}
      <ReactTooltip
        id={props.id}
        place={place}
        variant={variant}
        style={{
          backgroundColor: isDarkMode ? "#ced4da" : "",
          color: isDarkMode ? "#343a40" : "",
        }}
      >
        {props.content}
      </ReactTooltip>
    </div>
  );
};
