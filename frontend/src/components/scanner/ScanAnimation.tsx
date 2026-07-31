import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Cpu } from 'lucide-react';

export const ScanAnimation: React.FC = () => {
  return (
    <div className="text-center py-12 px-4 bg-forensic-panel border border-forensic-border rounded-xl">
      <div className="relative inline-block mb-6">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="p-4 rounded-full bg-forensic-bg border border-forensic-info/40 text-forensic-info shadow-[0_0_25px_rgba(0,229,255,0.35)]"
        >
          <ShieldAlert size={56} />
        </motion.div>
      </div>

      <h3 className="text-lg font-mono font-bold text-forensic-text uppercase tracking-wide flex items-center justify-center gap-2">
        <Cpu size={20} className="text-forensic-primary animate-pulse" />
        ANALYZING IMAGE METADATA & C2PA MANIFESTS...
      </h3>
      <p className="text-sm font-mono text-forensic-muted mt-2 max-w-md mx-auto">
        Running forensic inspection on EXIF header tags, GPS markers, camera hardware signatures, and digital provenance certificates.
      </p>
    </div>
  );
};
