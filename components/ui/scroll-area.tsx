import * as React from "react";

export const ScrollArea: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={`overflow-auto ${className}`}>{children}</div>
); 