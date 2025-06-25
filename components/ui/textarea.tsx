import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ ...props }, ref) => (
  <textarea ref={ref} className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#2C4A3C]" {...props} />
));
Textarea.displayName = "Textarea"; 