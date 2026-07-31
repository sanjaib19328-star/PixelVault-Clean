import { create } from 'zustand';

interface UploadState {
  file: File | null;
  filePreviewUrl: string | null;
  imageId: string | null;
  sha256Hash: string | null;
  isUploading: boolean;
  uploadError: string | null;
  setFile: (file: File | null) => void;
  setUploadSuccess: (imageId: string, sha256Hash: string) => void;
  setUploading: (isUploading: boolean) => void;
  setUploadError: (error: string | null) => void;
  resetUpload: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  file: null,
  filePreviewUrl: null,
  imageId: null,
  sha256Hash: null,
  isUploading: false,
  uploadError: null,

  setFile: (file) => {
    if (!file) {
      set({ file: null, filePreviewUrl: null, imageId: null, sha256Hash: null, uploadError: null });
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    set({ file, filePreviewUrl: previewUrl, uploadError: null });
  },

  setUploadSuccess: (imageId, sha256Hash) => set({ imageId, sha256Hash, isUploading: false, uploadError: null }),
  setUploading: (isUploading) => set({ isUploading }),
  setUploadError: (uploadError) => set({ uploadError, isUploading: false }),
  resetUpload: () => set({ file: null, filePreviewUrl: null, imageId: null, sha256Hash: null, isUploading: false, uploadError: null }),
}));
