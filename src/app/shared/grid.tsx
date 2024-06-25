import React from "react";
import { twMerge } from "tailwind-merge";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  rows?: number;
  columns?: number;
}

export const Grid: React.FC<GridProps> = ({ ...props }) => {
  const generateRows = () => {
    const rows = [];
    const totalRows = props.rows ? props.rows : 25;
    for (let i = 1; i <= totalRows; i++) {
      rows.push(i);
    }
    return rows;
  };

  const generateColumns = () => {
    const columns = [];
    const totalColumns = props.columns ? props.columns : 25;
    for (let i = 1; i <= totalColumns; i++) {
      columns.push(i);
    }
    return columns;
  };

  const rows = generateRows();
  const columns = generateColumns();

  return (
    <div
      className={twMerge(`w-full flex flex-col`, props.className)}
      {...props}
    >
      {rows.map((rowIndex) => (
        <div
          key={rowIndex}
          className={`flex items-center
           ${rowIndex === 1 && "[&>*]:border-t-[1px]"}`}
        >
          {columns.map((colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`border-b-[1px] border-r-[1px] 
              ${colIndex === 1 && "border-l-[1px]"} 
              border-color-border-primary w-full aspect-square`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};
