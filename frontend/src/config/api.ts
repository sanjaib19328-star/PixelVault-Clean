export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
export const API_V1_PREFIX = '/api/v1';

export const ENDPOINTS = {
  HEALTH: `${API_BASE_URL}${API_V1_PREFIX}/health`,
  UPLOAD: `${API_BASE_URL}${API_V1_PREFIX}/images/upload`,
  ANALYZE: (id: string) => `${API_BASE_URL}${API_V1_PREFIX}/images/${id}/analyze`,
  CLEAN: (id: string) => `${API_BASE_URL}${API_V1_PREFIX}/images/${id}/clean`,
  REPORT: (id: string) => `${API_BASE_URL}${API_V1_PREFIX}/images/${id}/report`,
  DOWNLOAD: (id: string) => `${API_BASE_URL}${API_V1_PREFIX}/images/${id}/download`,
};
