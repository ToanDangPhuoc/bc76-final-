import { Input } from "antd";
import React from "react";

const InputCustom = ({
  value,
  name,
  id,
  error,
  touched,
  handleBlue,
  handleChange,
  placeholder,
  type = "text",
  labelContent,
  className,
}) => {
  return (
    <div>
      <div className="grid justify-center">
        <label
          className={`font-medium mb-1 inline-block text-white `}
          htmlFor={id}
        >
          {labelContent}
        </label>
      </div>
      <Input
        name="name"
        value={value}
        id={id}
        onBlur={handleBlue}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className={className}
      />
      {error && touched ? (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      ) : null}
    </div>
  );
};

export default InputCustom;
