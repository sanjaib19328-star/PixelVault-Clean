import hashlib


class ImageHasher:
    @staticmethod
    def calculate_sha256(file_bytes: bytes) -> str:
        """Calculate SHA-256 hash of image file bytes."""
        sha256 = hashlib.sha256()
        sha256.update(file_bytes)
        return sha256.hexdigest()
