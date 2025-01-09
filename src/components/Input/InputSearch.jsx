import { Input } from "antd";
import React from "react";

const InputSearch = ({
  placeholder,
  value,
  handleChange,
  handleClick,
  handleFocus,
  handleBlur,
  onTouchStart,
  onTouchEnd,
}) => {
  return (
    <Input.Search
      placeholder={placeholder}
      onClick={handleClick}
      onChange={handleChange}
      value={value}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    />
  );
};

export default InputSearch;
