import React from 'react';
import { PageLayout } from '../layout/PageLayout';
import { UploadZone } from '../components/upload/UploadZone';
import { SecurityScoreCard } from '../components/report/SecurityScoreCard';
import { C2PASummaryCard } from '../components/report/C2PASummaryCard';
import { IntegrityHashCard } from '../components/report/IntegrityHashCard';
import { MetadataBadges } from '../components/report/MetadataBadges';
import { MetadataTable } from '../components/report/MetadataTable';
import { ComparisonViewer } from '../components/clean/ComparisonViewer';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Skeleton } from '../components/common/Skeleton';

import { useUploadStore } from '../store/uploadStore';
import { useScanStore } from '../store/scanStore';
import { uploadImage } from '../services/upload';
import { analyzeImage } from '../services/metadata';
import { cleanImage } from '../services/clean';
import { fetchForensicReport } from '../services/report';
import { downloadBlob, downloadJson } from '../utils/download';
import { Sparkles, RefreshCw, FileText, ArrowRight } from 'lucide-react';

export const ForensicsPage: React.FC = () => {
  const { file, imageId, isUploading, uploadError, setFile, setUploadSuccess, setUploading, setUploadError, resetUpload } = useUploadStore();
  const { scanResult, cleanResult, isAnalyzing, isCleaning, setScanResult, setCleanResult, setAnalyzing, setCleaning, setScanError, resetScan } = useScanStore();

  const handleFileSelected = async (selectedFile: File) => {
    resetUpload();
    resetScan();
    setFile(selectedFile);
    setUploading(true);

    try {
      const uploadRes = await uploadImage(selectedFile);
      setUploadSuccess(uploadRes.image_id, uploadRes.sha256_hash);

      setAnalyzing(true);
      const scanRes = await analyzeImage(uploadRes.image_id);
      setScanResult(scanRes);
    } catch (err: any) {
      const msg = err.message || 'Failed to upload and analyze image';
      setUploadError(msg);
      setScanError(msg);
    }
  };

  const handleCleanImage = async () => {
    if (!imageId) return;
    setCleaning(true);
    try {
      const cleanRes = await cleanImage(imageId);
      setCleanResult(cleanRes);
    } catch (err: any) {
      setScanError(err.message || 'Failed to sanitize image metadata');
    }
  };

  const handleDownloadCleanImage = async () => {
    if (!cleanResult) return;
    try {
      const response = await fetch(cleanResult.cleaned_file_url);
      const blob = await response.blob();
      downloadBlob(blob, cleanResult.cleaned_filename);
    } catch (err) {
      alert('Failed to download cleaned image');
    }
  };

  const handleDownloadReport = async () => {
    if (!imageId) return;
    try {
      const report = await fetchForensicReport(imageId);
      downloadJson(report, `forensic-report-${imageId}.json`);
    } catch (err) {
      alert('Failed to fetch forensic report');
    }
  };

  const handleResetAll = () => {
    resetUpload();
    resetScan();
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#C8FF00] shadow-[0_0_8px_#C8FF00]" />
              <h1 className="font-mono text-2xl font-black tracking-wider text-white sm:text-3xl">
                DIGITAL FORENSICS & PROVENANCE TOOLKIT
              </h1>
            </div>
            <p className="mt-1 font-mono text-xs text-slate-400">
              Inspect EXIF, XMP, IPTC headers • Verify C2PA Credentials • Sanitize Image Metadata
            </p>
          </div>

          {(scanResult || file) && (
            <Button variant="outline" size="sm" icon={<RefreshCw className="h-4 w-4" />} onClick={handleResetAll}>
              NEW FORENSIC SCAN
            </Button>
          )}
        </div>

        {!scanResult && !isAnalyzing && (
          <div className="mx-auto max-w-3xl">
            <UploadZone onFileSelected={handleFileSelected} isUploading={isUploading} error={uploadError} />
          </div>
        )}

        {isAnalyzing && (
          <div className="space-y-6">
            <div className="flex items-center justify-center p-8 font-mono text-xs text-[#00E5FF]">
              <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-[#00E5FF] border-t-transparent" />
              EXECUTING DEEP METADATA INSPECTION & C2PA ANALYSIS...
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Skeleton className="h-44 w-full" />
              <Skeleton className="h-44 w-full" />
              <Skeleton className="h-44 w-full" />
            </div>
          </div>
        )}

        {scanResult && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <SecurityScoreCard score={scanResult.security_score} riskLevel={scanResult.risk_level} />
              <C2PASummaryCard c2pa={scanResult.c2pa} />
              <IntegrityHashCard sha256Before={scanResult.sha256_hash} sha256After={cleanResult?.sha256_after} />
            </div>

            <Card>
              <h4 className="mb-3 font-mono text-xs font-semibold tracking-wider text-slate-400">
                HEADER METADATA DETECTION MATRIX
              </h4>
              <MetadataBadges breakdown={scanResult.breakdown} />
            </Card>

            {!cleanResult ? (
              <Card glow="lime" className="flex flex-col sm:flex-row items-center justify-between gap-4 border-[#C8FF00]/30">
                <div>
                  <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#C8FF00]" /> SANITISE & STRIP METADATA
                  </h3>
                  <p className="font-mono text-xs text-slate-400">
                    Removes all EXIF, GPS coordinates, XMP packets, IPTC tags, and C2PA credentials.
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button variant="outline" size="sm" icon={<FileText className="h-4 w-4" />} onClick={handleDownloadReport}>
                    EXPORT REPORT (.JSON)
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    isLoading={isCleaning}
                    icon={<ArrowRight className="h-4 w-4" />}
                    onClick={handleCleanImage}
                  >
                    CLEAN IMAGE NOW
                  </Button>
                </div>
              </Card>
            ) : (
              <ComparisonViewer
                cleanResult={cleanResult}
                onDownloadImage={handleDownloadCleanImage}
                onDownloadReport={handleDownloadReport}
              />
            )}

            <div>
              <h3 className="mb-4 font-mono text-sm font-bold tracking-wider text-white">
                DEEP HEADER METADATA BREAKDOWN
              </h3>
              <MetadataTable exif={scanResult.exif} />
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
