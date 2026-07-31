import { ENDPOINTS } from '../config/api';
import { apiClient } from './client';

export interface ImageCleanResponse {
  image_id: string;
  original_filename: string;
  cleaned_filename: string;
  cleaned_file_url: string;
  sha256_before: string;
  sha256_after: string;
  file_size_before_bytes: number;
  file_size_after_bytes: number;
  removed_metadata_types: string[];
  removed_exif_count: number;
  c2pa_stripped: boolean;
  new_security_score: number;
}

export async function cleanImage(imageId: string): Promise<ImageCleanResponse> {
  return apiClient<ImageCleanResponse>(ENDPOINTS.CLEAN(imageId), {
    method: 'POST',
  });
}
