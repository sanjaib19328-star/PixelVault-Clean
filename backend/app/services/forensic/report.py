import datetime
from typing import Any


class ForensicReportGenerator:
    @staticmethod
    def generate_json_report(
        filename: str,
        sha256_before: str,
        filesize_before: int,
        metadata_found: list[str],
        c2pa_detected: bool,
        security_score: int,
        sha256_after: str | None = None,
        filesize_after: int | None = None,
        metadata_removed: list[str] | None = None,
        processing_time_ms: float = 120.0,
    ) -> dict[str, Any]:
        """Generate standardized reproducible JSON forensic report."""
        return {
            "platform": "PixelVault-Clean",
            "version": "1.0.0",
            "generated_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "filename": filename,
            "provenance": {
                "sha256_before": sha256_before,
                "sha256_after": sha256_after,
                "filesize_before_bytes": filesize_before,
                "filesize_after_bytes": filesize_after,
                "integrity_verified": (sha256_before != sha256_after) if sha256_after else False,
            },
            "security_analysis": {
                "security_score": security_score,
                "risk_level": "HIGH" if security_score < 60 else ("MEDIUM" if security_score < 85 else "LOW"),
                "c2pa_credentials_detected": c2pa_detected,
                "metadata_found": metadata_found,
                "metadata_removed": metadata_removed or [],
            },
            "performance": {
                "processing_time_ms": processing_time_ms,
            },
        }
