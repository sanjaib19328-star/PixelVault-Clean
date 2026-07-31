import React, { useRef } from "react";
import { Upload, FileImage, ShieldCheck } from "lucide-react";
import { Button } from "../common/Button";

interface UploadScannerProps {
  onFileSelect: (file: File) => Promise<void>;
}

export const UploadScanner: React.FC<UploadScannerProps> = ({
  onFileSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const validateFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Only JPEG, PNG, and WEBP are supported.");
      return false;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert("File size exceeds 50MB limit.");
      return false;
    }

    return true;
  };

  const processFile = async (file: File) => {
    if (!validateFile(file)) {
      return;
    }

    await onFileSelect(file);
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }

    // Reset input so same file can be selected again
    e.target.value = "";
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="
        border-2 
        border-dashed 
        border-forensic-border
        hover:border-forensic-primary/60
        rounded-xl
        p-10
        text-center
        bg-forensic-panel
        transition-all
        duration-200
      "
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        className="
          flex
          justify-center
          mb-4
          text-forensic-primary
        "
      >
        <Upload size={48} />
      </div>

      <h3
        className="
          text-xl
          font-mono
          font-semibold
          text-forensic-text
          mb-2
        "
      >
        DROP IMAGE FOR FORENSIC INSPECTION
      </h3>

      <p
        className="
          text-sm
          text-forensic-muted
          mb-6
        "
      >
        Supported formats: JPEG, PNG, WEBP (Max size: 50MB)
      </p>

      <div
        className="
          flex
          justify-center
          items-center
          gap-4
          text-xs
          font-mono
          text-forensic-muted
          mb-6
        "
      >
        <span className="flex items-center gap-1">
          <FileImage
            size={14}
            className="text-forensic-info"
          />
          EXIF Extraction
        </span>

        <span className="flex items-center gap-1">
          <ShieldCheck
            size={14}
            className="text-forensic-primary"
          />
          C2PA Manifest Verification
        </span>
      </div>

      <Button
        variant="primary"
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        Select File
      </Button>
    </div>
  );
};