import React, { useState } from "react";
import Switch from "react-switch";

interface ToggleSwitchProps {
  checked: boolean;
  disabled?: boolean;
  offColor?: string; // hexadecimal
  onColor?: string; //hexadecimal
  checkedIcon?: JSX.Element;
  uncheckedIcon?: JSX.Element;
  onCheck: (value: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = (props) => {
  const [checked, setChecked] = useState(props.checked ? props.checked : false);

  const onChangeHandler = (checked: boolean) => {
    setChecked(() => checked);
    props.onCheck(checked);
  };

  return (
    <label>
      <Switch
        onChange={onChangeHandler}
        checked={checked}
        disabled={props.disabled ? props.disabled : false}
        offColor={props.offColor}
        onColor={props.onColor}
        checkedIcon={props.checkedIcon}
        uncheckedIcon={props.uncheckedIcon}
        className="flex items-center justify-between"
        activeBoxShadow="0 0 2px 3px #0ca678"
      />
    </label>
  );
};
