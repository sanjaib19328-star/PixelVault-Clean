import React from 'react';
import { MetadataBreakdown } from '../../services/metadata';

interface MetadataBadgesProps {
  breakdown: MetadataBreakdown;
}

export const MetadataBadges: React.FC<MetadataBadgesProps> = ({ breakdown }) => {
  const items = [
    { label: 'EXIF', detected: breakdown.exif_found },
    { label: 'GPS', detected: breakdown.gps_found },
    { label: 'XMP', detected: breakdown.xmp_found },
    { label: 'IPTC', detected: breakdown.iptc_found },
    { label: 'C2PA', detected: breakdown.c2pa_found },
    { label: 'ICC Profile', detected: breakdown.icc_profile_found },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 font-mono text-xs sm:grid-cols-3 md:grid-cols-6">
      {items.map((item) => (
        <div
          key={item.label}
          className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
            item.detected
              ? 'border-[#FF5C35]/40 bg-[#FF5C35]/10 text-white'
              : 'border-[#1E293B] bg-[#0F172A] text-slate-500'
          }`}
        >
          <span className="font-semibold">{item.label}</span>
          <span
            className={`h-2 w-2 rounded-full ${
              item.detected ? 'bg-[#FF5C35] shadow-[0_0_8px_#FF5C35]' : 'bg-slate-600'
            }`}
          />
        </div>
      ))}
    </div>
  );
};
