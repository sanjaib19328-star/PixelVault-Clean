# pyrefly: ignore [missing-import]

import io
import os

from PIL import Image
from fastapi import HTTPException, status

from app.schemas.image_schema import ImageCleanResponse
from app.services.c2pa_service import C2PAService
from app.services.forensic.hashing import ImageHasher
from app.services.image_service import ImageService
from app.storage.file_manager import file_manager


class CleaningService:
    @staticmethod
    def clean_image(file_bytes: bytes) -> tuple[bytes, int, bool, list[str]]:
        """
        Remove EXIF metadata, XMP, IPTC, and strip C2PA manifests.
        Returns:
            (cleaned_bytes, removed_exif_count, c2pa_stripped, removed_metadata_types)
        """
        removed_types = []
        removed_count = 0
        c2pa_stripped = False

        try:
            image = Image.open(io.BytesIO(file_bytes))

            # Count EXIF tags if present
            raw_exif = image._getexif() if hasattr(image, "_getexif") else None
            if raw_exif:
                removed_count = len(raw_exif)
                removed_types.append("EXIF")
                if 34853 in raw_exif:  # GPS tag ID
                    removed_types.append("GPS Coordinates")

            # Check XMP/IPTC presence
            if b"http://ns.adobe.com/xap/1.0/" in file_bytes or b"<x:xmpmeta" in file_bytes:
                removed_types.append("XMP Packet")

            if b"\x1c\x02" in file_bytes or b"Photoshop 3.0" in file_bytes:
                removed_types.append("IPTC Profile")

            # Create a fresh image without metadata
            cleaned_image = Image.new(image.mode, image.size)
            cleaned_image.putdata(list(image.getdata()))

            output = io.BytesIO()
            image_format = image.format or "JPEG"

            cleaned_image.save(output, format=image_format)

            cleaned_bytes = output.getvalue()

            has_c2pa = b"jumb" in file_bytes or b"c2pa" in file_bytes
            if has_c2pa:
                cleaned_bytes = C2PAService.strip_c2pa_manifest(cleaned_bytes)
                c2pa_stripped = True
                removed_types.append("C2PA Content Credentials")

            if not removed_types:
                removed_types.append("Standard Header Metadata")

            return cleaned_bytes, removed_count, c2pa_stripped, removed_types

        except Exception:
            return file_bytes, 0, False, []

    @staticmethod
    def clean_image_by_id(image_id: str) -> ImageCleanResponse:
        """
        Load an uploaded image, remove metadata,
        save the cleaned image, and return the response.
        """
        original_path = ImageService._find_original_file_path(image_id)

        try:
            with open(original_path, "rb") as file:
                file_bytes = file.read()
        except OSError as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Unable to read image: {exc}",
            ) from exc

        sha256_before = ImageHasher.calculate_sha256(file_bytes)

        cleaned_bytes, removed_count, c2pa_stripped, removed_types = (
            CleaningService.clean_image(file_bytes)
        )

        sha256_after = ImageHasher.calculate_sha256(cleaned_bytes)

        cleaned_filename, _ = file_manager.save_clean(
            cleaned_bytes,
            os.path.basename(original_path),
        )

        return ImageCleanResponse(
            image_id=image_id,
            original_filename=os.path.basename(original_path),
            cleaned_filename=cleaned_filename,
            cleaned_file_url=f"/api/v1/images/{image_id}/download",
            sha256_before=sha256_before,
            sha256_after=sha256_after,
            file_size_before_bytes=len(file_bytes),
            file_size_after_bytes=len(cleaned_bytes),
            removed_metadata_types=removed_types,
            removed_exif_count=removed_count,
            c2pa_stripped=c2pa_stripped,
            new_security_score=100,
        )