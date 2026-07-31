# pyrefly: ignore [missing-import]

import os
import shutil
import uuid
from typing import Tuple

from app.core.config import settings


class FileManager:
    def __init__(self, base_dir: str = settings.UPLOAD_DIR):
        self.base_dir = base_dir

        self.originals_dir = os.path.join(base_dir, "originals")
        self.cleaned_dir = os.path.join(base_dir, "cleaned")
        self.temp_dir = os.path.join(base_dir, "temp")

        self._ensure_directories()

    def _ensure_directories(self) -> None:
        """Create required upload directories."""
        os.makedirs(self.originals_dir, exist_ok=True)
        os.makedirs(self.cleaned_dir, exist_ok=True)
        os.makedirs(self.temp_dir, exist_ok=True)

    def _generate_unique_filename(self, original_filename: str) -> str:
        """Generate a UUID filename while preserving the extension."""
        ext = (
            os.path.splitext(original_filename)[1].lower()
            if "." in original_filename
            else ""
        )
        return f"{uuid.uuid4()}{ext}"

    def _delete(self, path: str) -> bool:
        """Delete a file if it exists."""
        try:
            if os.path.isfile(path):
                os.remove(path)
                return True
        except OSError:
            pass

        return False

    def save_original(
        self,
        content: bytes,
        original_filename: str,
    ) -> Tuple[str, str]:
        """Save an uploaded image."""
        filename = self._generate_unique_filename(original_filename)
        filepath = os.path.join(self.originals_dir, filename)

        with open(filepath, "wb") as file:
            file.write(content)

        return filename, filepath

    def save_clean(
        self,
        content: bytes,
        original_filename: str,
    ) -> Tuple[str, str]:
        """Save a cleaned image using the same image ID."""

        filename = original_filename
        filepath = os.path.join(self.cleaned_dir, filename)

        with open(filepath, "wb") as file:
            file.write(content)

        return filename, filepath

    def get_original_path(self, filename: str) -> str:
        """Return the absolute path of an original image."""
        return os.path.join(self.originals_dir, filename)

    def get_clean_path(self, filename: str) -> str:
        """Return the absolute path of a cleaned image."""
        return os.path.join(self.cleaned_dir, filename)

    def delete_original(self, filename: str) -> bool:
        """Delete an original image."""
        return self._delete(self.get_original_path(filename))

    def delete_clean(self, filename: str) -> bool:
        """Delete a cleaned image."""
        return self._delete(self.get_clean_path(filename))

    def cleanup_temp(self) -> None:
        """Remove every file and folder inside uploads/temp."""
        if not os.path.exists(self.temp_dir):
            return

        for item in os.listdir(self.temp_dir):
            item_path = os.path.join(self.temp_dir, item)

            try:
                if os.path.isfile(item_path) or os.path.islink(item_path):
                    os.unlink(item_path)
                elif os.path.isdir(item_path):
                    shutil.rmtree(item_path)
            except OSError:
                continue


file_manager = FileManager()