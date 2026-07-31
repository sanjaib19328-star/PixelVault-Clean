export interface EXIFMetadata {
  camera_make?: string;
  camera_model?: string;
  date_taken?: string;

  gps_detected?: boolean;
  gps_latitude?: number;
  gps_longitude?: number;

  software?: string;

  raw_tags?: Record<string, unknown>;
}

export interface C2PAManifest {
  has_c2pa: boolean;
  active_manifest?: string;
  claim_generator?: string;
  signature_status?: string;

  assertions?: Array<Record<string, unknown>>;
}

export interface ImageScanResult {
  image_id: string;
  filename: string;

  file_size_bytes: number;
  mime_type?: string;
  format: string;

  dimensions: {
    width: number;
    height: number;
  };

  exif: EXIFMetadata;
  c2pa: C2PAManifest;

  has_sensitive_metadata: boolean;
  risk_score: number;

  status?: "uploaded" | "processing" | "completed" | "failed";

  job_id?: string;
}

export interface ImageCleanResponse {
  image_id: string;

  original_filename: string;
  cleaned_filename: string;

  cleaned_file_url: string;

  removed_exif_count: number;
  c2pa_stripped: boolean;

  cleaned_file_size_bytes?: number;

  job_id?: string;
}