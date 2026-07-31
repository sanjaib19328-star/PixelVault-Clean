import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-6">
      <div className="w-10 h-10 border-4 border-forensic-border border-t-forensic-primary rounded-full animate-spin" />
    </div>
  );
};
