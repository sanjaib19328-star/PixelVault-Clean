import { useCallback } from 'react';
import { useUploadStore } from '../store/uploadStore';
import { useScanStore } from '../store/scanStore';
import { uploadImage } from '../services/upload';
import { analyzeImage } from '../services/metadata';
import { cleanImage } from '../services/clean';

export function useImageUpload() {
  const { imageId, setFile, setUploadSuccess, setUploading, setUploadError, resetUpload } = useUploadStore();
  const { setScanResult, setCleanResult, setAnalyzing, setCleaning, setScanError, resetScan } = useScanStore();

  const handleUploadAndAnalyze = useCallback(
    async (file: File) => {
      try {
        resetUpload();
        resetScan();
        setFile(file);
        setUploading(true);

        const uploadRes = await uploadImage(file);
        setUploadSuccess(uploadRes.image_id, uploadRes.sha256_hash);

        setAnalyzing(true);
        const scanRes = await analyzeImage(uploadRes.image_id);
        setScanResult(scanRes);
      } catch (err: any) {
        const message = err.message || 'Failed to upload and analyze image';
        setUploadError(message);
        setScanError(message);
      }
    },
    [resetUpload, resetScan, setFile, setUploading, setUploadSuccess, setAnalyzing, setScanResult, setUploadError, setScanError]
  );

  const handleCleanImage = useCallback(async () => {
    try {
      if (!imageId) throw new Error('No uploaded image available');
      setCleaning(true);
      const cleanRes = await cleanImage(imageId);
      setCleanResult(cleanRes);
    } catch (err: any) {
      setScanError(err.message || 'Failed to clean image');
    }
  }, [imageId, setCleaning, setCleanResult, setScanError]);

  return {
    handleUploadAndAnalyze,
    handleCleanImage,
  };
}