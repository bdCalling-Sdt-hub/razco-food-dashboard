import React from "react";

interface IButton {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactElement;
}

const Button: React.FC<IButton> = ({ children, className, onClick, icon }) => {
  return (
    <button
      className={`h-11 flex items-center justify-center gap-2 bg-secondary text-white p-2 rounded  ${className}`}
      onClick={onClick}
    >
      {" "}
      {children}
      {icon}
    </button>
  );
};

export default Button;
