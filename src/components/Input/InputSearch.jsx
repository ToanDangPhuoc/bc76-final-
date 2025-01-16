import { Input } from "antd";
import React from "react";

const InputSearch = ({
  value,
  placeholder,
  onKeyDown,
  handleChange,
  handleClick,
}) => {
  return (
    <Input.Search
      value={value}
      onClick={handleClick}
      onChange={handleChange}
      className="input_search"
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
};

export default InputSearch;
