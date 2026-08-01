import React from "react";
import { Download, CheckCircle2 } from "lucide-react";
import { ImageCleanResponse } from "../../types/image";
import { Button } from "../common/Button";
import { API_BASE_URL } from "@/config/api";

interface DownloadCardProps {
  cleanResult: ImageCleanResponse;
}

export const DownloadCard: React.FC<DownloadCardProps> = ({
  cleanResult,
}) => {
  return (
    <div
      className="
        bg-forensic-panel
        border
        border-forensic-primary
        rounded-xl
        p-6
        text-center
        shadow-[0_0_30px_rgba(200,255,0,0.25)]
      "
    >
      <CheckCircle2
        size={48}
        className="mx-auto mb-3 text-forensic-primary"
      />

      <h3
        className="
          mb-2
          text-lg
          font-mono
          font-bold
          uppercase
          tracking-wide
          text-forensic-text
        "
      >
        IMAGE SANITIZATION SUCCESSFUL
      </h3>

      <p
        className="
          mb-6
          text-xs
          font-mono
          text-forensic-muted
        "
      >
        REMOVED EXIF TAGS:{" "}
        <span className="font-bold text-forensic-primary">
          {cleanResult.removed_exif_count}
        </span>{" "}
        | C2PA MANIFEST STRIPPED:{" "}
        <span className="font-bold text-forensic-info">
          {cleanResult.c2pa_stripped ? "YES" : "N/A"}
        </span>
      </p>

      <a
        href={`${API_BASE_URL}${cleanResult.cleaned_file_url}`}
        download={cleanResult.cleaned_filename}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="primary">
          <Download size={18} />
          Download Clean Image
        </Button>
      </a>
    </div>
  );
};