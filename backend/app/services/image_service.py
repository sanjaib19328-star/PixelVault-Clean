# pyrefly: ignore [missing-import]

import io
import mimetypes
import os

from PIL import Image
from fastapi import HTTPException, status
from fastapi.responses import FileResponse

from app.schemas.image_schema import ImageScanResult, MetadataBreakdown
from app.services.c2pa_service import C2PAService
from app.services.forensic.hashing import ImageHasher
from app.services.forensic.validator import FileValidator
from app.services.metadata_service import MetadataService
from app.storage.file_manager import file_manager


class ImageService:
    @staticmethod
    def validate_image_file(
        filename: str,
        content_type: str,
        file_bytes: bytes,
    ) -> str:
        """Validate uploaded image using FileValidator."""
        return FileValidator.validate(filename, content_type, file_bytes)

    @staticmethod
    def upload_image_file(
        file_bytes: bytes,
        filename: str,
        content_type: str,
    ) -> dict:
        """Validate and store uploaded image."""

        ImageService.validate_image_file(
            filename,
            content_type,
            file_bytes,
        )

        stored_filename, _ = file_manager.save_original(
            file_bytes,
            filename,
        )

        sha256_hash = ImageHasher.calculate_sha256(file_bytes)

        return {
            "image_id": stored_filename,
            "filename": filename,
            "sha256_hash": sha256_hash,
            "file_size_bytes": len(file_bytes),
        }

    @staticmethod
    def _find_original_file_path(image_id: str) -> str:
        """Resolve original image path."""

        path = file_manager.get_original_path(image_id)

        if os.path.isfile(path):
            return path

        if os.path.exists(file_manager.originals_dir):
            for file in os.listdir(file_manager.originals_dir):
                if file == image_id or file.startswith(f"{image_id}."):
                    return os.path.join(
                        file_manager.originals_dir,
                        file,
                    )

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Image '{image_id}' not found.",
        )

    @staticmethod
    def calculate_security_score(
        gps_detected: bool,
        has_exif: bool,
        has_c2pa: bool,
        has_xmp: bool,
        has_iptc: bool,
        raw_tags_count: int,
    ) -> tuple[int, str]:
        """
        Calculate overall security score (0 to 100).
        100 = Completely secure & clean.
        Deductions: GPS (-40), C2PA (-20), EXIF tags (-15), XMP (-15), IPTC (-10).
        """
        score = 100
        if gps_detected:
            score -= 40
        if has_c2pa:
            score -= 20
        if has_exif:
            score -= 15
        if has_xmp:
            score -= 15
        if has_iptc:
            score -= 10

        score = max(0, min(100, score))

        if score >= 90:
            risk_level = "LOW"
        elif score >= 70:
            risk_level = "MEDIUM"
        elif score >= 40:
            risk_level = "HIGH"
        else:
            risk_level = "CRITICAL"

        return score, risk_level

    @staticmethod
    def analyze_image_by_id(
        image_id: str,
    ) -> ImageScanResult:
        """Analyze uploaded image and compute forensic indicators."""

        filepath = ImageService._find_original_file_path(image_id)

        try:
            with open(filepath, "rb") as file:
                file_bytes = file.read()
        except OSError as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to read image: {exc}",
            ) from exc

        try:
            image = Image.open(io.BytesIO(file_bytes))
            width, height = image.size
            image_format = image.format or "UNKNOWN"
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid image: {exc}",
            ) from exc

        sha256_hash = ImageHasher.calculate_sha256(file_bytes)
        exif = MetadataService.extract_exif(file_bytes)
        c2pa = C2PAService.inspect_c2pa_manifest(file_bytes)
        xmp_iptc = MetadataService.inspect_xmp_iptc(file_bytes)

        breakdown = MetadataBreakdown(
            exif_found=exif.has_exif,
            gps_found=exif.gps_detected,
            xmp_found=xmp_iptc.get("has_xmp", False),
            iptc_found=xmp_iptc.get("has_iptc", False),
            icc_profile_found=xmp_iptc.get("has_icc_profile", False),
            c2pa_found=c2pa.has_c2pa,
            tags_count=len(exif.raw_tags),
        )

        security_score, risk_level = ImageService.calculate_security_score(
            gps_detected=exif.gps_detected,
            has_exif=exif.has_exif,
            has_c2pa=c2pa.has_c2pa,
            has_xmp=breakdown.xmp_found,
            has_iptc=breakdown.iptc_found,
            raw_tags_count=breakdown.tags_count,
        )

        has_sensitive = bool(
            exif.gps_detected
            or breakdown.exif_found
            or c2pa.has_c2pa
            or breakdown.xmp_found
        )

        return ImageScanResult(
            image_id=image_id,
            filename=os.path.basename(filepath),
            file_size_bytes=len(file_bytes),
            format=image_format,
            mime_type=mimetypes.guess_type(filepath)[0] or "application/octet-stream",
            sha256_hash=sha256_hash,
            dimensions={
                "width": width,
                "height": height,
            },
            exif=exif,
            c2pa=c2pa,
            breakdown=breakdown,
            security_score=security_score,
            risk_level=risk_level,
            has_sensitive_metadata=has_sensitive,
            status="completed",
        )

    @staticmethod
    def get_download_response(
        image_id: str,
    ) -> FileResponse:
        """Return cleaned image."""

        clean_path = file_manager.get_clean_path(image_id)

        if not os.path.isfile(clean_path):
            if os.path.exists(file_manager.cleaned_dir):
                for file in os.listdir(file_manager.cleaned_dir):
                    if file == image_id or file.startswith(f"{image_id}."):
                        clean_path = os.path.join(
                            file_manager.cleaned_dir,
                            file,
                        )
                        break
                else:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Cleaned image '{image_id}' not found.",
                    )
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Cleaned image '{image_id}' not found.",
                )

        media_type = mimetypes.guess_type(clean_path)[0] or "application/octet-stream"

        return FileResponse(
            path=clean_path,
            filename=os.path.basename(clean_path),
            media_type=media_type,
        )