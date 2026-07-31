import React from 'react';
import { ImageScanResult } from '../../types/image';
import { FileCode, MapPin, Camera, ShieldAlert } from 'lucide-react';

interface MetadataReportProps {
  scanResult: ImageScanResult;
}

export const MetadataReport: React.FC<MetadataReportProps> = ({ scanResult }) => {
  const { exif, c2pa, dimensions, format } = scanResult;

  return (
    <div className="bg-forensic-panel border border-forensic-border rounded-xl p-6 mb-6">
      <h3 className="text-md font-mono font-bold text-forensic-primary uppercase tracking-widest border-b border-forensic-border pb-3 mb-6 flex items-center gap-2">
        <FileCode size={18} /> FORENSIC METADATA REPORT
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-forensic-card p-4 rounded-lg border border-forensic-border">
          <h4 className="font-mono text-sm text-forensic-info font-semibold mb-2 flex items-center gap-1.5">
            <Camera size={16} /> IMAGE DIMENSIONS & FORMAT
          </h4>
          <p className="text-xs font-mono text-forensic-muted">FORMAT: <span className="text-forensic-text">{format}</span></p>
          <p className="text-xs font-mono text-forensic-muted">RESOLUTION: <span className="text-forensic-text">{dimensions.width} x {dimensions.height} PX</span></p>
        </div>

        <div className="bg-forensic-card p-4 rounded-lg border border-forensic-border">
          <h4 className="font-mono text-sm text-forensic-info font-semibold mb-2 flex items-center gap-1.5">
            <ShieldAlert size={16} /> C2PA PROVENANCE CERTIFICATE
          </h4>
          <p className="text-xs font-mono text-forensic-muted">
            STATUS: <span className={c2pa.has_c2pa ? 'text-forensic-warning font-bold' : 'text-forensic-primary'}>
              {c2pa.has_c2pa ? 'C2PA MANIFEST DETECTED' : 'NO C2PA MANIFEST'}
            </span>
          </p>
          {c2pa.claim_generator && (
            <p className="text-xs font-mono text-forensic-muted">GENERATOR: <span className="text-forensic-text">{c2pa.claim_generator}</span></p>
          )}
        </div>
      </div>

      <div className="mt-6 bg-forensic-card p-4 rounded-lg border border-forensic-border">
        <h4 className="font-mono text-sm text-forensic-info font-semibold mb-3 flex items-center gap-1.5">
          <MapPin size={16} /> EXIF & HARDWARE TAGS
        </h4>
        {exif.camera_make || exif.camera_model || (exif.raw_tags && Object.keys(exif.raw_tags).length > 0) ? (
          <ul className="text-xs font-mono text-forensic-muted space-y-1.5 list-disc list-inside">
            {exif.camera_make && <li>CAMERA MAKE: <span className="text-forensic-text">{exif.camera_make}</span></li>}
            {exif.camera_model && <li>CAMERA MODEL: <span className="text-forensic-text">{exif.camera_model}</span></li>}
            {exif.date_taken && <li>TIMESTAMP: <span className="text-forensic-text">{exif.date_taken}</span></li>}
            {exif.software && <li>SOFTWARE: <span className="text-forensic-text">{exif.software}</span></li>}
          </ul>
        ) : (
          <p className="text-xs font-mono text-forensic-muted">No EXIF or hardware tags detected.</p>
        )}
      </div>
    </div>
  );
};
