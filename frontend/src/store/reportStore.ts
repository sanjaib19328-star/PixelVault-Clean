import { create } from 'zustand';
import { ForensicReportResponse } from '../services/report';

interface ReportState {
  report: ForensicReportResponse | null;
  isLoadingReport: boolean;
  reportError: string | null;

  setReport: (report: ForensicReportResponse) => void;
  setLoadingReport: (isLoadingReport: boolean) => void;
  setReportError: (error: string | null) => void;
  resetReport: () => void;
}

export const useReportStore = create<ReportState>((set) => ({
  report: null,
  isLoadingReport: false,
  reportError: null,

  setReport: (report) => set({ report, isLoadingReport: false, reportError: null }),
  setLoadingReport: (isLoadingReport) => set({ isLoadingReport }),
  setReportError: (reportError) => set({ reportError, isLoadingReport: false }),
  resetReport: () => set({ report: null, isLoadingReport: false, reportError: null }),
}));
