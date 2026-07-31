import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Activity } from 'lucide-react';
import { APP_TAGLINE } from '../config/constants';
import { checkHealth } from '../services/health';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);

  useEffect(() => {
    checkHealth()
      .then(() => setIsHealthy(true))
      .catch(() => setIsHealthy(false));
  }, []);

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'SCANNER', path: '/scan' },
    { label: 'RESULT', path: '/result' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1E293B] bg-[#080B12]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C8FF00]/10 border border-[#C8FF00]/30 text-[#C8FF00] shadow-[0_0_15px_rgba(200,255,0,0.15)] group-hover:scale-105 transition-transform">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg font-bold tracking-wider text-white">
                PIXEL<span className="text-[#C8FF00]">VAULT</span>
              </span>
              <span className="rounded bg-[#00E5FF]/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#00E5FF] border border-[#00E5FF]/20">
                FORENSICS v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block font-mono">{APP_TAGLINE}</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4 font-mono text-xs">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  isActive
                    ? 'border border-[#C8FF00]/50 bg-[#C8FF00]/10 text-[#C8FF00] font-bold shadow-[0_0_10px_rgba(200,255,0,0.15)]'
                    : 'border border-[#1E293B] bg-[#0F172A] text-slate-300 hover:border-slate-600 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div
            className={`hidden md:flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] ${
              isHealthy === true
                ? 'border-[#C8FF00]/30 bg-[#C8FF00]/10 text-[#C8FF00]'
                : isHealthy === false
                ? 'border-[#FF5C35]/30 bg-[#FF5C35]/10 text-[#FF5C35]'
                : 'border-slate-700 bg-slate-800 text-slate-400'
            }`}
            title="Backend API Status"
          >
            <Activity className="h-3 w-3 animate-pulse" />
            <span>{isHealthy === true ? 'API ONLINE' : isHealthy === false ? 'API OFFLINE' : 'CHECKING...'}</span>
          </div>
        </nav>
      </div>
    </header>
  );
};
