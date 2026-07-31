import { ENDPOINTS } from '../config/api';
import { apiClient } from './client';

export interface UploadResponse {
  image_id: string;
  filename: string;
  sha256_hash: string;
  file_size_bytes: number;
}

export async function uploadImage(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  return apiClient<UploadResponse>(ENDPOINTS.UPLOAD, {
    method: 'POST',
    body: formData,
  });
}
