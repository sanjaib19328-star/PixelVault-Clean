import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageLayout } from '../layout/PageLayout';
import { SecurityScoreCard } from '../components/report/SecurityScoreCard';
import { C2PASummaryCard } from '../components/report/C2PASummaryCard';
import { IntegrityHashCard } from '../components/report/IntegrityHashCard';
import { MetadataBadges } from '../components/report/MetadataBadges';
import { MetadataTable } from '../components/report/MetadataTable';
import { ComparisonViewer } from '../components/clean/ComparisonViewer';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { ToastContainer, ToastMessage } from '../components/common/Toast';
import { useUploadStore } from '../store/uploadStore';
import { useScanStore } from '../store/scanStore';
import { cleanImage } from '../services/clean';
import { fetchForensicReport } from '../services/report';
import { downloadBlob, downloadJson } from '../utils/download';
import { Sparkles, RefreshCw, FileText, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

export const Result: React.FC = () => {
  const navigate = useNavigate();
  const { imageId, resetUpload } = useUploadStore();
  const { scanResult, cleanResult, isCleaning, setCleanResult, setCleaning, setScanError, resetScan } = useScanStore();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', text: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCleanImage = async () => {
    const targetId = scanResult?.image_id || imageId;
    if (!targetId) return;

    setCleaning(true);
    addToast('info', 'Sanitising image metadata & stripping C2PA...');

    try {
      const cleanRes = await cleanImage(targetId);
      setCleanResult(cleanRes);
      addToast('success', 'Metadata sanitised cleanly! (Score: 100/100)');
    } catch (err: any) {
      const msg = err.message || 'Failed to clean image';
      setScanError(msg);
      addToast('error', msg);
    }
  };

  const handleDownloadCleanImage = async () => {
    if (!cleanResult) return;
    try {
      addToast('info', 'Preparing clean image download...');
      const response = await fetch(cleanResult.cleaned_file_url);
      const blob = await response.blob();
      downloadBlob(blob, cleanResult.cleaned_filename);
      addToast('success', 'Clean image downloaded!');
    } catch (err) {
      addToast('error', 'Failed to download clean image file');
    }
  };

  const handleDownloadReport = async () => {
    const targetId = scanResult?.image_id || imageId;
    if (!targetId) return;

    try {
      addToast('info', 'Generating forensic audit JSON report...');
      const report = await fetchForensicReport(targetId);
      downloadJson(report, `forensic-report-${targetId}.json`);
      addToast('success', 'Forensic report exported successfully!');
    } catch (err) {
      addToast('error', 'Failed to fetch forensic audit report');
    }
  };

  const handleNewScan = () => {
    resetUpload();
    resetScan();
    navigate('/scan');
  };

  if (!scanResult) {
    return (
      <PageLayout>
        <div className="py-20 text-center font-mono">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 text-[#00E5FF]">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">NO ACTIVE FORENSIC SCAN RESULT</h2>
          <p className="mt-2 text-xs text-slate-400">Please upload an image file in the scanner to inspect metadata & C2PA credentials.</p>
          <div className="mt-6">
            <Link to="/scan">
              <Button variant="primary" icon={<ArrowRight className="h-4 w-4" />}>
                GO TO SCANNER
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
      <div className="space-y-8 font-mono">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/scan')}
                className="text-xs text-slate-400 hover:text-[#C8FF00] flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> SCANNER
              </button>
              <span className="text-slate-600">/</span>
              <span className="text-xs text-[#00E5FF] font-bold">ANALYSIS RESULTS</span>
            </div>
            <h1 className="mt-1 text-2xl font-black tracking-wider text-white sm:text-3xl">
              FORENSIC SECURITY DASHBOARD
            </h1>
            <p className="mt-0.5 text-xs text-slate-400">
              FILE: {scanResult.filename} ({Math.round(scanResult.file_size_bytes / 1024)} KB) • {scanResult.format}
            </p>
          </div>

          <Button variant="outline" size="sm" icon={<RefreshCw className="h-4 w-4" />} onClick={handleNewScan}>
            NEW FORENSIC SCAN
          </Button>
        </div>

        {/* Top Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <SecurityScoreCard score={scanResult.security_score} riskLevel={scanResult.risk_level} />
          <C2PASummaryCard c2pa={scanResult.c2pa} />
          <IntegrityHashCard sha256Before={scanResult.sha256_hash} sha256After={cleanResult?.sha256_after} />
        </div>

        {/* Header Metadata Detection Matrix */}
        <Card>
          <h4 className="mb-3 font-mono text-xs font-semibold tracking-wider text-slate-400">
            HEADER METADATA DETECTION MATRIX
          </h4>
          <MetadataBadges breakdown={scanResult.breakdown} />
        </Card>

        {/* Cleaning Action / Comparison Card */}
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

        {/* Deep Header Breakdown Table */}
        <div>
          <h3 className="mb-4 font-mono text-sm font-bold tracking-wider text-white">
            DEEP HEADER METADATA BREAKDOWN
          </h3>
          <MetadataTable exif={scanResult.exif} />
        </div>
      </div>
    </PageLayout>
  );
};
