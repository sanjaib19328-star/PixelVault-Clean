import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../layout/PageLayout';
import { UploadZone } from '../components/upload/UploadZone';
import { ScanAnimation } from '../components/scanner/ScanAnimation';
import { ToastContainer, ToastMessage } from '../components/common/Toast';
import { useUploadStore } from '../store/uploadStore';
import { useScanStore } from '../store/scanStore';
import { uploadImage } from '../services/upload';
import { analyzeImage } from '../services/metadata';
import { FileSearch } from 'lucide-react';

export const Scan: React.FC = () => {
  const navigate = useNavigate();
  const { setFile, setUploadSuccess, setUploading, setUploadError, resetUpload } = useUploadStore();
  const { setScanResult, setAnalyzing, setScanError, resetScan } = useScanStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', text: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleFileSelected = async (file: File) => {
    resetUpload();
    resetScan();
    setFile(file);
    setUploading(true);
    setIsProcessing(true);

    addToast('info', `Uploading file: ${file.name}`);

    try {
      // 1. Upload
      const uploadRes = await uploadImage(file);
      setUploadSuccess(uploadRes.image_id, uploadRes.sha256_hash);

      // 2. Analyze
      setAnalyzing(true);
      addToast('info', 'Analyzing EXIF & C2PA manifest...');

      const scanRes = await analyzeImage(uploadRes.image_id);
      setScanResult(scanRes);

      addToast('success', 'Forensic inspection completed!');
      setIsProcessing(false);

      // Navigate to /result to view the dashboard
      setTimeout(() => {
        navigate('/result');
      }, 500);
    } catch (err: any) {
      const msg = err.message || 'Failed to analyze image file';
      setUploadError(msg);
      setScanError(msg);
      setIsProcessing(false);
      addToast('error', msg);
    }
  };

  return (
    <PageLayout>
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
      <div className="space-y-8 font-mono max-w-4xl mx-auto py-4">
        <div className="border-b border-[#1E293B] pb-6">
          <div className="flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-[#00E5FF]" />
            <h1 className="text-2xl font-black tracking-wider text-white sm:text-3xl">
              FORENSIC SCANNER
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Upload an image file (JPEG, PNG, WEBP) to extract EXIF headers, camera provenance, GPS tags, and C2PA manifests.
          </p>
        </div>

        {isProcessing ? (
          <ScanAnimation />
        ) : (
          <UploadZone onFileSelected={handleFileSelected} isUploading={isProcessing} />
        )}
      </div>
    </PageLayout>
  );
};
