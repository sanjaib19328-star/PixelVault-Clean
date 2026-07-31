export * from './client';
export * from './upload';
export * from './metadata';
export * from './clean';
export * from './report';
export * from './health';

import { uploadImage } from './upload';
import { analyzeImage } from './metadata';
import { cleanImage } from './clean';

export const uploadImageApi = uploadImage;
export const analyzeImageApi = analyzeImage;
export const cleanImageApi = cleanImage;
export function downloadImageUrl(imageId: string): string {
  return `/api/v1/images/${imageId}/download`;
}