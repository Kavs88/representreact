import * as React from "react";

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={`bg-white dark:bg-gray-900 rounded-lg shadow p-6 ${className}`}>{children}</div>
);

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={className}>{children}</div>
); 