import React from 'react';
import { ImageCleanResponse } from '../../services/clean';
import { ShieldCheck, Download, FileCode } from 'lucide-react';
import { Button } from '../common/Button';
import { bytesToMB, truncateHash } from '../../utils/format';

interface ComparisonViewerProps {
  cleanResult: ImageCleanResponse;
  onDownloadImage: () => void;
  onDownloadReport: () => void;
}

export const ComparisonViewer: React.FC<ComparisonViewerProps> = ({
  cleanResult,
  onDownloadImage,
  onDownloadReport,
}) => {
  return (
    <div className="rounded-2xl border border-[#C8FF00]/40 bg-[#0F172A] p-6 shadow-[0_0_30px_rgba(200,255,0,0.1)] font-mono">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C8FF00]/20 text-[#C8FF00]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">METADATA SANITISATION COMPLETE</h3>
            <p className="text-xs text-[#C8FF00]">Security Score: 100 / 100 • Clean Output Verified</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<FileCode className="h-4 w-4" />} onClick={onDownloadReport}>
            DOWNLOAD REPORT (.JSON)
          </Button>
          <Button variant="primary" size="sm" icon={<Download className="h-4 w-4" />} onClick={onDownloadImage}>
            DOWNLOAD CLEAN IMAGE
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-[#FF5C35]/30 bg-[#080B12] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-[#FF5C35]">ORIGINAL INPUT</span>
            <span className="rounded bg-[#FF5C35]/10 px-2 py-0.5 text-[10px] text-[#FF5C35] border border-[#FF5C35]/30">UNSANITIZED</span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between border-b border-[#1E293B] py-1.5">
              <span className="text-slate-500">File Name:</span>
              <span className="font-semibold text-white truncate max-w-[200px]">{cleanResult.original_filename}</span>
            </div>
            <div className="flex justify-between border-b border-[#1E293B] py-1.5">
              <span className="text-slate-500">File Size:</span>
              <span>{bytesToMB(cleanResult.file_size_before_bytes)}</span>
            </div>
            <div className="flex justify-between border-b border-[#1E293B] py-1.5">
              <span className="text-slate-500">SHA-256 Hash:</span>
              <span className="text-[#FF5C35]">{truncateHash(cleanResult.sha256_before, 6, 6)}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Status:</span>
              <span className="text-[#FF5C35]">Metadata & Credentials Embedded</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#C8FF00]/40 bg-[#080B12] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-[#C8FF00]">CLEANED OUTPUT</span>
            <span className="rounded bg-[#C8FF00]/10 px-2 py-0.5 text-[10px] text-[#C8FF00] border border-[#C8FF00]/30">SANITISED</span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between border-b border-[#1E293B] py-1.5">
              <span className="text-slate-500">File Name:</span>
              <span className="font-semibold text-white truncate max-w-[200px]">{cleanResult.cleaned_filename}</span>
            </div>
            <div className="flex justify-between border-b border-[#1E293B] py-1.5">
              <span className="text-slate-500">File Size:</span>
              <span>{bytesToMB(cleanResult.file_size_after_bytes)}</span>
            </div>
            <div className="flex justify-between border-b border-[#1E293B] py-1.5">
              <span className="text-slate-500">SHA-256 Hash:</span>
              <span className="text-[#C8FF00]">{truncateHash(cleanResult.sha256_after, 6, 6)}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Status:</span>
              <span className="text-[#C8FF00]">Header Clean • C2PA Stripped</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[#1E293B] bg-[#080B12] p-4">
        <h4 className="mb-2 text-xs font-bold text-slate-300">REMOVED METADATA SEGMENTS ({cleanResult.removed_metadata_types.length})</h4>
        <div className="flex flex-wrap gap-2">
          {cleanResult.removed_metadata_types.map((type) => (
            <span key={type} className="rounded-md border border-[#FF5C35]/30 bg-[#FF5C35]/10 px-2.5 py-1 text-xs text-[#FF5C35]">
              ✓ Stripped {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
