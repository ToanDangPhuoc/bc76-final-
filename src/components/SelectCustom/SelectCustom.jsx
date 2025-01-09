import { Select } from "antd";
import React from "react";

const SelectCustom = ({
  labelConten,
  onChange,
  id,
  value,
  handleBlur,
  name,
  option,
}) => {
  return (
    <div>
      <label htmlFor="">{labelConten}</label>
      <Select
        id={id}
        value={value}
        onBlur={handleBlur}
        options={option}
        className="block"
        onChange={(value) => {
          onChange({ target: { name: name, value: value } });
        }}
      />
    </div>
  );
};

export default SelectCustom;
