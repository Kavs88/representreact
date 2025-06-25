import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button className="px-4 py-2 rounded bg-[#2C4A3C] text-white hover:bg-[#1a3028] transition-colors" {...props}>
    {children}
  </button>
); 