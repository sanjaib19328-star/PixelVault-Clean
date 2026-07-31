import React, { useState, useRef } from 'react';
import { UploadCloud, FileImage, AlertTriangle } from 'lucide-react';
import { MAX_FILE_SIZE_MB, SUPPORTED_EXTENSIONS } from '../../config/constants';

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  isUploading: boolean;
  error?: string | null;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelected, isUploading, error }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-[#C8FF00] bg-[#C8FF00]/10 shadow-[0_0_30px_rgba(200,255,0,0.15)]'
            : 'border-[#1E293B] bg-[#0F172A]/50 hover:border-[#00E5FF]/50 hover:bg-[#0F172A]/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={SUPPORTED_EXTENSIONS.join(',')}
          onChange={handleChange}
          className="hidden"
          disabled={isUploading}
        />

        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#C8FF00]/30 bg-[#C8FF00]/10 text-[#C8FF00] shadow-[0_0_20px_rgba(200,255,0,0.2)] group-hover:scale-110 transition-transform">
          <UploadCloud className="h-8 w-8" />
        </div>

        <h3 className="mb-1 font-mono text-base font-semibold text-white">
          DRAG & DROP IMAGE FOR FORENSIC SCAN
        </h3>
        <p className="mb-4 text-xs font-mono text-slate-400">
          Supported Formats: JPEG, PNG, WEBP • Max Size: {MAX_FILE_SIZE_MB}MB
        </p>

        <div className="flex items-center gap-2 rounded-lg border border-[#1E293B] bg-[#080B12] px-4 py-2 font-mono text-xs text-[#00E5FF]">
          <FileImage className="h-4 w-4" />
          <span>BROWSE DISK FILES</span>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#FF5C35]/30 bg-[#FF5C35]/10 p-3 font-mono text-xs text-[#FF5C35]">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
