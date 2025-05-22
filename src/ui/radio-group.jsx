import React from "react";

export const RadioGroup = ({ children, className = "", value, onValueChange }) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export const RadioGroupItem = ({ id, value, ...props }) => {
  return (
    <input
      type="radio"
      id={id}
      name="radio-group"
      value={value}
      onChange={(e) => props.onChange?.(e.target.value)}
      className="accent-green-600 w-5 h-5"
      {...props}
    />
  );
};
