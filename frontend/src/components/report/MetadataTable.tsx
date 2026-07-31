import React from 'react';
import { EXIFMetadata } from '../../services/metadata';
import { MapPin, Camera } from 'lucide-react';

interface MetadataTableProps {
  exif: EXIFMetadata;
}

export const MetadataTable: React.FC<MetadataTableProps> = ({ exif }) => {
  const hasRawTags = Object.keys(exif.raw_tags || {}).length > 0;

  return (
    <div className="space-y-6 font-mono">
      <div className="rounded-xl border border-[#1E293B] bg-[#0F172A] p-5">
        <h4 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00E5FF]">
          <Camera className="h-4 w-4" /> Camera & Exposure Provenance
        </h4>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 text-xs">
          <div className="rounded-lg border border-[#1E293B] bg-[#080B12] p-3">
            <span className="block text-[10px] text-slate-500">CAMERA MAKE</span>
            <span className="font-semibold text-white">{exif.camera_make || 'Not Embedded'}</span>
          </div>
          <div className="rounded-lg border border-[#1E293B] bg-[#080B12] p-3">
            <span className="block text-[10px] text-slate-500">CAMERA MODEL</span>
            <span className="font-semibold text-white">{exif.camera_model || 'Not Embedded'}</span>
          </div>
          <div className="rounded-lg border border-[#1E293B] bg-[#080B12] p-3">
            <span className="block text-[10px] text-slate-500">CAPTURE TIMESTAMP</span>
            <span className="font-semibold text-white">{exif.date_taken || 'Not Embedded'}</span>
          </div>
          <div className="rounded-lg border border-[#1E293B] bg-[#080B12] p-3">
            <span className="block text-[10px] text-slate-500">LENS MODEL</span>
            <span className="font-semibold text-white">{exif.lens_model || 'Not Embedded'}</span>
          </div>
          <div className="rounded-lg border border-[#1E293B] bg-[#080B12] p-3">
            <span className="block text-[10px] text-slate-500">SERIAL NUMBER</span>
            <span className="font-semibold text-white">{exif.serial_number || 'Not Embedded'}</span>
          </div>
          <div className="rounded-lg border border-[#1E293B] bg-[#080B12] p-3">
            <span className="block text-[10px] text-slate-500">PROCESSING SOFTWARE</span>
            <span className="font-semibold text-white">{exif.software || 'Not Embedded'}</span>
          </div>
        </div>
      </div>

      <div className={`rounded-xl border p-5 ${exif.gps_detected ? 'border-[#FF5C35]/50 bg-[#FF5C35]/5' : 'border-[#1E293B] bg-[#0F172A]'}`}>
        <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF5C35]">
          <MapPin className="h-4 w-4" /> GPS Geo-Location Tracking
        </h4>

        {exif.gps_detected ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs font-mono">
            <div className="rounded-lg border border-[#FF5C35]/30 bg-[#080B12] p-3">
              <span className="block text-[10px] text-slate-400">LATITUDE</span>
              <span className="font-bold text-[#FF5C35]">{exif.gps_latitude}</span>
            </div>
            <div className="rounded-lg border border-[#FF5C35]/30 bg-[#080B12] p-3">
              <span className="block text-[10px] text-slate-400">LONGITUDE</span>
              <span className="font-bold text-[#FF5C35]">{exif.gps_longitude}</span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500">No geographic positioning tags embedded in header.</p>
        )}
      </div>

      {hasRawTags && (
        <div className="rounded-xl border border-[#1E293B] bg-[#0F172A] p-5">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-300">
            Raw EXIF Tag Dump ({Object.keys(exif.raw_tags).length} tags)
          </h4>

          <div className="max-h-60 overflow-y-auto rounded-lg border border-[#1E293B] bg-[#080B12]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="sticky top-0 border-b border-[#1E293B] bg-[#0F172A] text-slate-400">
                <tr>
                  <th className="px-4 py-2">TAG NAME</th>
                  <th className="px-4 py-2">RAW VALUE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B] text-slate-300">
                {Object.entries(exif.raw_tags).map(([key, value]) => (
                  <tr key={key} className="hover:bg-[#1E293B]/40">
                    <td className="px-4 py-2 text-[#00E5FF]">{key}</td>
                    <td className="px-4 py-2 truncate max-w-xs">{String(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
