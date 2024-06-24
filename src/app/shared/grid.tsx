import React from "react";
import { twMerge } from "tailwind-merge";

interface GridProps {
  className?: string;
}

export const Grid: React.FC<GridProps> = (props) => {
  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 20; i++) {
      rows.push(i);
    }
    return rows;
  };

  const generateColumns = () => {
    const columns = [];
    for (let i = 1; i <= 30; i++) {
      columns.push(i);
    }
    return columns;
  };

  const rows = generateRows();
  const columns = generateColumns();

  return (
    <table
      className={twMerge(
        `border-separate border-spacing-0 w-full overflow-x-hidden`,
        props.className
      )}
    >
      <tbody>
        {rows.map((_, index) => (
          <tr
            className={`[&>*]:border-b-[1px] 
             [&>*]:border-color-border-primary border-color-border-primary
             ${index === 0 && "border-t-[1px]"}`}
            key={index}
          >
            {columns.map((_, index) => (
              <td
                key={index}
                className={`p-4 border-r-[1px] 
                 ${index === 0 && "border-l-[1px]"} 
                 border-color-border-primary cursor-pointer`}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
