import { ENDPOINTS } from '../config/api';
import { apiClient } from './client';

export interface EXIFMetadata {
  has_exif: boolean;
  camera_make?: string;
  camera_model?: string;
  date_taken?: string;
  lens_model?: string;
  serial_number?: string;
  software?: string;
  gps_detected: boolean;
  gps_latitude?: number;
  gps_longitude?: number;
  gps_altitude?: string;
  raw_tags: Record<string, any>;
}

export interface C2PAManifest {
  has_c2pa: boolean;
  active_manifest?: string;
  claim_generator?: string;
  signature_status?: string;
  assertions: Array<Record<string, any>>;
}

export interface MetadataBreakdown {
  exif_found: boolean;
  gps_found: boolean;
  xmp_found: boolean;
  iptc_found: boolean;
  icc_profile_found: boolean;
  c2pa_found: boolean;
  tags_count: number;
}

export interface ImageScanResult {
  image_id: string;
  filename: string;
  file_size_bytes: number;
  mime_type?: string;
  format: string;
  sha256_hash: string;
  dimensions: { width: number; height: number };
  exif: EXIFMetadata;
  c2pa: C2PAManifest;
  breakdown: MetadataBreakdown;
  security_score: number;
  risk_level: string;
  has_sensitive_metadata: boolean;
  status: string;
}

export async function analyzeImage(imageId: string): Promise<ImageScanResult> {
  return apiClient<ImageScanResult>(ENDPOINTS.ANALYZE(imageId), {
    method: 'POST',
  });
}
