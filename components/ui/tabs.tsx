import * as React from "react";

export const Tabs: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-full">{children}</div>
);

export const TabsList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex space-x-2 border-b mb-4">{children}</div>
);

export const TabsTrigger: React.FC<{ children: React.ReactNode; onClick?: () => void; active?: boolean }> = ({ children, onClick, active }) => (
  <button
    className={`px-4 py-2 font-medium border-b-2 transition-colors ${active ? 'border-[#2C4A3C] text-[#2C4A3C]' : 'border-transparent text-gray-600 hover:text-[#2C4A3C]'}`}
    onClick={onClick}
  >
    {children}
  </button>
); 