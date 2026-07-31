import { ENDPOINTS } from '../config/api';
import { apiClient } from './client';

export interface HealthResponse {
  status: string;
  version?: string;
}

export async function checkHealth(): Promise<HealthResponse> {
  return apiClient<HealthResponse>(ENDPOINTS.HEALTH, {
    method: 'GET',
  });
}
