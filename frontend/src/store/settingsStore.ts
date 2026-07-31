import { create } from 'zustand';

interface SettingsState {
  autoClean: boolean;
  preserveFormat: boolean;
  exportPdfReport: boolean;
  setAutoClean: (autoClean: boolean) => void;
  setPreserveFormat: (preserveFormat: boolean) => void;
  setExportPdfReport: (exportPdfReport: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  autoClean: false,
  preserveFormat: true,
  exportPdfReport: true,

  setAutoClean: (autoClean) => set({ autoClean }),
  setPreserveFormat: (preserveFormat) => set({ preserveFormat }),
  setExportPdfReport: (exportPdfReport) => set({ exportPdfReport }),
}));
