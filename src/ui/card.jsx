import React from "react";
import clsx from "clsx";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={clsx("bg-white rounded-lg shadow-md", className)}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={clsx("p-4", className)}>{children}</div>;
};

export const CardFooter = ({ children, className = "" }) => {
  return <div className={clsx("p-4 border-t", className)}>{children}</div>;
};
