import { useCallback } from 'react';
import { useUploadStore } from '../store/uploadStore';
import { useScanStore } from '../store/scanStore';
import { uploadImage } from '../services/upload';
import { analyzeImage } from '../services/metadata';
import { cleanImage } from '../services/clean';
import { ENDPOINTS } from '../services/api'; // <-- Make sure this path matches your project

export function useImageUpload() {
  const {
    imageId,
    setFile,
    setUploadSuccess,
    setUploading,
    setUploadError,
    resetUpload,
  } = useUploadStore();

  const {
    setScanResult,
    setCleanResult,
    setAnalyzing,
    setCleaning,
    setScanError,
    resetScan,
  } = useScanStore();

  const handleUploadAndAnalyze = useCallback(
    async (file: File) => {
      try {
        resetUpload();
        resetScan();

        setFile(file);
        setUploading(true);

        // Upload Image
        const uploadRes = await uploadImage(file);

        console.log("UPLOAD RESPONSE:", uploadRes);
        console.log("IMAGE ID:", uploadRes.image_id);

        setUploadSuccess(uploadRes.image_id, uploadRes.sha256_hash);

        console.log(
          "ANALYZE URL:",
          ENDPOINTS.ANALYZE(uploadRes.image_id)
        );

        // Analyze Image
        setAnalyzing(true);

        const scanRes = await analyzeImage(uploadRes.image_id);

        console.log("SCAN RESPONSE:", scanRes);

        setScanResult(scanRes);
      } catch (err: any) {
        console.error("UPLOAD/ANALYZE ERROR:", err);

        const message = err.message || 'Failed to upload and analyze image';
        setUploadError(message);
        setScanError(message);
      }
    },
    [
      resetUpload,
      resetScan,
      setFile,
      setUploading,
      setUploadSuccess,
      setAnalyzing,
      setScanResult,
      setUploadError,
      setScanError,
    ]
  );

  const handleCleanImage = useCallback(async () => {
    try {
      if (!imageId) throw new Error('No uploaded image available');

      setCleaning(true);

      const cleanRes = await cleanImage(imageId);

      console.log("CLEAN RESPONSE:", cleanRes);

      setCleanResult(cleanRes);
    } catch (err: any) {
      console.error("CLEAN ERROR:", err);
      setScanError(err.message || 'Failed to clean image');
    }
  }, [imageId, setCleaning, setCleanResult, setScanError]);

  return {
    handleUploadAndAnalyze,
    handleCleanImage,
  };
}