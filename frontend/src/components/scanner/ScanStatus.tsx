import React from 'react';
import { ImageScanResult } from '../../types/image';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ScanStatusProps {
  result: ImageScanResult;
}

export const ScanStatus: React.FC<ScanStatusProps> = ({ result }) => {
  const isHighRisk = result.risk_score > 50;

  return (
    <div
      className={`p-5 rounded-xl border-l-4 mb-6 bg-forensic-card ${
        isHighRisk
          ? 'border-l-forensic-warning border-y border-r border-forensic-border'
          : 'border-l-forensic-primary border-y border-r border-forensic-border'
      }`}
    >
      <div className="flex items-center gap-3">
        {isHighRisk ? (
          <AlertTriangle className="text-forensic-warning flex-shrink-0" size={28} />
        ) : (
          <CheckCircle2 className="text-forensic-primary flex-shrink-0" size={28} />
        )}
        <div>
          <h4 className="font-mono font-bold text-lg text-forensic-text uppercase tracking-wide">
            {isHighRisk ? 'POTENTIAL METADATA LEAK DETECTED' : 'LOW METADATA RISK'}
          </h4>
          <p className="text-xs font-mono text-forensic-muted mt-1">
            RISK INDEX: <span className={isHighRisk ? 'text-forensic-warning font-bold' : 'text-forensic-primary font-bold'}>{result.risk_score}/100</span> | FILE: {result.filename} ({Math.round(result.file_size_bytes / 1024)} KB)
          </p>
        </div>
      </div>
    </div>
  );
};
