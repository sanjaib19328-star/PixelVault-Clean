import React from 'react';
import { Lock, Unlock, CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '../common/Card';
import { C2PAManifest } from '../../services/metadata';

interface C2PASummaryCardProps {
  c2pa: C2PAManifest;
}

export const C2PASummaryCard: React.FC<C2PASummaryCardProps> = ({ c2pa }) => {
  return (
    <Card className="flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-semibold tracking-wider text-slate-400">
          C2PA CONTENT CREDENTIALS
        </span>
        {c2pa.has_c2pa ? (
          <Lock className="h-6 w-6 text-[#00E5FF]" />
        ) : (
          <Unlock className="h-6 w-6 text-slate-500" />
        )}
      </div>

      <div className="my-4 font-mono">
        <div className="flex items-center gap-2">
          {c2pa.has_c2pa ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-[#00E5FF]" />
              <span className="text-lg font-bold text-white">MANIFEST DETECTED</span>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-slate-500" />
              <span className="text-lg font-bold text-slate-400">NO C2PA DETECTED</span>
            </>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-400">
          {c2pa.has_c2pa
            ? `Generator: ${c2pa.claim_generator || 'Standard Provenance Claim'}`
            : 'Image has no embedded C2PA origin manifests'}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-[#1E293B] pt-3 font-mono text-xs">
        <span className="text-slate-400">SIGNATURE STATUS</span>
        <span className={c2pa.has_c2pa ? 'text-[#00E5FF] font-semibold' : 'text-slate-500'}>
          {c2pa.signature_status || 'N/A'}
        </span>
      </div>
    </Card>
  );
};
