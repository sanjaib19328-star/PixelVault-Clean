import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#1E293B] bg-[#080B12] py-6 font-mono text-xs text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#C8FF00]" />
          <span>PixelVault Forensics Platform • Digital Image Provenance & Security Engine</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <span className="flex items-center gap-1">
            <Cpu className="h-3.5 w-3.5 text-[#00E5FF]" /> FastAPI + PIL + C2PA
          </span>
          <span>•</span>
          <span>Zero File Persistence Guarantee</span>
        </div>
      </div>
    </footer>
  );
};
