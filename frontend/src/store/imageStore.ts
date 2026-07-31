import { useUploadStore } from './uploadStore';
import { useScanStore } from './scanStore';

export function useImageStore() {
  const uploadState = useUploadStore();
  const scanState = useScanStore();

  return {
    currentFile: uploadState.file,
    imageId: uploadState.imageId,
    scanResult: scanState.scanResult,
    cleanResult: scanState.cleanResult,
    isScanning: scanState.isAnalyzing || uploadState.isUploading,
    isCleaning: scanState.isCleaning,
    error: uploadState.uploadError || scanState.scanError,
    setCurrentFile: uploadState.setFile,
    reset: () => {
      uploadState.resetUpload();
      scanState.resetScan();
    },
  };
}