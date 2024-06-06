import React from "react";
import { Rating } from "react-custom-rating-component";

interface AppRatingProps {
  value: number;
  onChange: (rating: number) => void;
}

export const AppRating: React.FC<AppRatingProps> = (props) => {
  const onChangeHandler = (newRating: number) => {
    props.onChange(newRating);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Rating
        defaultValue={props.value}
        size="24px"
        spacing="10px"
        activeColor="#fab005"
        onChange={(newRating) => onChangeHandler(newRating)}
        classNames="text-secondary"
      />
    </div>
  );
};
