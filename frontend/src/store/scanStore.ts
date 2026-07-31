import { create } from 'zustand';
import { ImageScanResult } from '../services/metadata';
import { ImageCleanResponse } from '../services/clean';

interface ScanState {
  scanResult: ImageScanResult | null;
  cleanResult: ImageCleanResponse | null;
  isAnalyzing: boolean;
  isCleaning: boolean;
  scanError: string | null;

  setScanResult: (result: ImageScanResult) => void;
  setCleanResult: (result: ImageCleanResponse) => void;
  setAnalyzing: (isAnalyzing: boolean) => void;
  setCleaning: (isCleaning: boolean) => void;
  setScanError: (error: string | null) => void;
  resetScan: () => void;
}

export const useScanStore = create<ScanState>((set) => ({
  scanResult: null,
  cleanResult: null,
  isAnalyzing: false,
  isCleaning: false,
  scanError: null,

  setScanResult: (scanResult) => set({ scanResult, isAnalyzing: false, scanError: null }),
  setCleanResult: (cleanResult) => set({ cleanResult, isCleaning: false, scanError: null }),
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setCleaning: (isCleaning) => set({ isCleaning }),
  setScanError: (scanError) => set({ scanError, isAnalyzing: false, isCleaning: false }),
  resetScan: () => set({ scanResult: null, cleanResult: null, isAnalyzing: false, isCleaning: false, scanError: null }),
}));
