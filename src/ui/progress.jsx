import React from "react";

export const Progress = ({ value = 0, className = "", indicatorClassName = "" }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full ${className}`}>
      <div
        className={`h-full bg-green-500 rounded-full transition-all duration-300 ${indicatorClassName}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
