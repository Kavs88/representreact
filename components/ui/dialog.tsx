import * as React from "react";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 min-w-[300px] max-w-lg">
        {children}
        <button className="absolute top-4 right-4 text-gray-500" onClick={() => onOpenChange(false)}>
          &times;
        </button>
      </div>
    </div>
  );
};

export const DialogContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={className}>{children}</div>
);

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const DialogTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <h2 className={`text-lg font-bold ${className}`}>{children}</h2>
);

export const DialogDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-600 dark:text-gray-300 mb-2">{children}</p>
);

export const DialogFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-4 flex justify-end space-x-2">{children}</div>
); 