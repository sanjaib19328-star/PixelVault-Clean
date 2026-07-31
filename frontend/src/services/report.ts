import { ENDPOINTS } from '../config/api';
import { apiClient } from './client';

export interface ForensicReportResponse {
  platform: string;
  version: string;
  generated_at: string;
  filename: string;
  provenance: {
    sha256_before: string;
    sha256_after?: string;
    filesize_before_bytes: number;
    filesize_after_bytes?: number;
    integrity_verified: boolean;
  };
  security_analysis: {
    security_score: number;
    risk_level: string;
    c2pa_credentials_detected: boolean;
    metadata_found: string[];
    metadata_removed: string[];
  };
  performance: {
    processing_time_ms: number;
  };
}

export async function fetchForensicReport(imageId: string): Promise<ForensicReportResponse> {
  return apiClient<ForensicReportResponse>(ENDPOINTS.REPORT(imageId), {
    method: 'GET',
  });
}
