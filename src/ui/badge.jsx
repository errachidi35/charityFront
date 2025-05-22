import React from "react";
import clsx from "clsx";

export const Badge = ({ children, variant = "default", className = "" }) => {
  return (
    <span
      className={clsx(
        "inline-block px-3 py-1 text-sm rounded-full font-semibold",
        variant === "outline"
          ? "border border-gray-400 text-gray-700"
          : "bg-gray-800 text-white",
        className
      )}
    >
      {children}
    </span>
  );
};
