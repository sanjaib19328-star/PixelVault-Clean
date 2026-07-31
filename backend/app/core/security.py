import hashlib
import secrets


def generate_file_hash(file_bytes: bytes) -> str:
    """Generates SHA-256 hash for image content verification."""
    return hashlib.sha256(file_bytes).hexdigest()


def generate_secure_token(length: int = 32) -> str:
    """Generates secure token for session / upload reference."""
    return secrets.token_hex(length // 2)
