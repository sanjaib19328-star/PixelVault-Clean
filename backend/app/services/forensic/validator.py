from fastapi import HTTPException, status
from app.core.config import settings


class FileValidator:
    MAGIC_NUMBERS = {
        b"\xff\xd8\xff": "image/jpeg",
        b"\x89PNG\r\n\x1a\n": "image/png",
        b"RIFF": "image/webp",
    }

    @classmethod
    def validate(cls, filename: str, content_type: str, file_bytes: bytes) -> str:
        """Validate file size, extension, and header magic numbers."""
        if len(file_bytes) > settings.MAX_FILE_SIZE_BYTES:
            max_mb = settings.MAX_FILE_SIZE_BYTES // (1024 * 1024)
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"File size exceeds allowed maximum of {max_mb}MB.",
            )

        ext = filename.rsplit(".", 1)[1].lower() if "." in filename else ""
        if ext not in settings.ALLOWED_EXTENSIONS:
            allowed = ", ".join(sorted(settings.ALLOWED_EXTENSIONS))
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Extension '.{ext}' not allowed. Must be one of: {allowed}",
            )

        # Validate Magic bytes
        valid_magic = False
        for magic, mime in cls.MAGIC_NUMBERS.items():
            if file_bytes.startswith(magic):
                valid_magic = True
                break

        if not valid_magic:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File magic number does not match supported JPEG, PNG, or WEBP headers.",
            )

        return ext
