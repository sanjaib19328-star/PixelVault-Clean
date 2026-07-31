import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'lime' | 'cyan' | 'orange' | 'none';
}

export const Card: React.FC<CardProps> = ({ children, className = '', glow = 'none' }) => {
  const glowStyles = {
    lime: 'border-[#C8FF00]/30 shadow-[0_0_20px_rgba(200,255,0,0.08)]',
    cyan: 'border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.08)]',
    orange: 'border-[#FF5C35]/30 shadow-[0_0_20px_rgba(255,92,53,0.08)]',
    none: 'border-[#1E293B]',
  };

  return (
    <div className={`rounded-xl border bg-[#0F172A]/80 backdrop-blur-md p-6 ${glowStyles[glow]} ${className}`}>
      {children}
    </div>
  );
};
