import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => (
  <input ref={ref} className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#2C4A3C]" {...props} />
));
Input.displayName = "Input"; 