import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Card } from '../common/Card';

interface SecurityScoreCardProps {
  score: number;
  riskLevel: string;
}

export const SecurityScoreCard: React.FC<SecurityScoreCardProps> = ({ score, riskLevel }) => {
  const getScoreColor = () => {
    if (score >= 90) return 'text-[#C8FF00] border-[#C8FF00]/40 bg-[#C8FF00]/10';
    if (score >= 70) return 'text-[#00E5FF] border-[#00E5FF]/40 bg-[#00E5FF]/10';
    if (score >= 40) return 'text-[#FF5C35] border-[#FF5C35]/40 bg-[#FF5C35]/10';
    return 'text-red-500 border-red-500/40 bg-red-500/10';
  };

  const getIcon = () => {
    if (score >= 80) return <ShieldCheck className="h-8 w-8 text-[#C8FF00]" />;
    if (score >= 50) return <ShieldAlert className="h-8 w-8 text-[#00E5FF]" />;
    return <AlertTriangle className="h-8 w-8 text-[#FF5C35]" />;
  };

  return (
    <Card glow={score >= 80 ? 'lime' : score >= 50 ? 'cyan' : 'orange'} className="flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-semibold tracking-wider text-slate-400">
          OVERALL SECURITY SCORE
        </span>
        {getIcon()}
      </div>

      <div className="my-4 flex items-baseline gap-2 font-mono">
        <span className="text-5xl font-black text-white">{score}</span>
        <span className="text-sm text-slate-500">/ 100</span>
      </div>

      <div className="flex items-center justify-between border-t border-[#1E293B] pt-3">
        <span className="font-mono text-xs text-slate-400">RISK CLASSIFICATION</span>
        <span className={`rounded-md border px-2.5 py-1 font-mono text-xs font-bold tracking-wider ${getScoreColor()}`}>
          {riskLevel} RISK
        </span>
      </div>
    </Card>
  );
};
