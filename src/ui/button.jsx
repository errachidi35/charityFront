import React from "react";

export const Button = ({ className = "", children, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold bg-green-600 text-white hover:bg-green-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
