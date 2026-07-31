import React, { useState } from 'react';
import { Fingerprint, Copy, Check } from 'lucide-react';
import { Card } from '../common/Card';
import { truncateHash } from '../../utils/format';

interface IntegrityHashCardProps {
  sha256Before: string;
  sha256After?: string | null;
}

export const IntegrityHashCard: React.FC<IntegrityHashCardProps> = ({ sha256Before, sha256After }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(sha256Before);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-semibold tracking-wider text-slate-400">
          PROVENANCE INTEGRITY (SHA-256)
        </span>
        <Fingerprint className="h-6 w-6 text-[#C8FF00]" />
      </div>

      <div className="my-3 font-mono">
        <div className="flex items-center justify-between rounded-lg border border-[#1E293B] bg-[#080B12] p-2.5">
          <div className="overflow-hidden">
            <span className="block text-[10px] text-slate-500">ORIGINAL HASH</span>
            <span className="text-xs font-bold text-[#C8FF00]" title={sha256Before}>
              {truncateHash(sha256Before, 10, 10)}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="rounded p-1 text-slate-400 hover:bg-[#1E293B] hover:text-white"
            title="Copy Full SHA-256 Hash"
          >
            {copied ? <Check className="h-4 w-4 text-[#C8FF00]" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        {sha256After && (
          <div className="mt-2 rounded-lg border border-[#1E293B] bg-[#080B12] p-2.5">
            <span className="block text-[10px] text-slate-500">SANITISED HASH</span>
            <span className="text-xs font-bold text-[#00E5FF]" title={sha256After}>
              {truncateHash(sha256After, 10, 10)}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-[#1E293B] pt-3 font-mono text-xs">
        <span className="text-slate-400">CRYPTOGRAPHIC ALGORITHM</span>
        <span className="font-bold text-white">SHA-256 Digest</span>
      </div>
    </Card>
  );
};
