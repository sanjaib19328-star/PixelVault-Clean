import io
from typing import Any
from PIL import Image, ExifTags


class EXIFExtractor:
    @staticmethod
    def _convert_to_degrees(value: Any) -> float | None:
        """Helper function to convert GPS coordinates to degrees decimal format."""
        if not value:
            return None
        try:
            d = float(value[0])
            m = float(value[1])
            s = float(value[2])
            return d + (m / 60.0) + (s / 3600.0)
        except Exception:
            return None

    @classmethod
    def extract_exif(cls, file_bytes: bytes) -> dict[str, Any]:
        """Extract detailed EXIF tags, GPS metadata, and sensitive parameters."""
        try:
            image = Image.open(io.BytesIO(file_bytes))
            raw_exif = image._getexif() if hasattr(image, "_getexif") else None
            if not raw_exif:
                return {
                    "has_exif": False,
                    "tags": {},
                    "gps": {"detected": False},
                    "camera": {},
                }

            exif_tags: dict[str, Any] = {}
            gps_info: dict[str, Any] = {"detected": False}

            gps_tags_map = getattr(ExifTags, "GPSTAGS", {})

            for tag_id, value in raw_exif.items():
                tag_name = ExifTags.TAGS.get(tag_id, str(tag_id))
                if tag_name == "GPSInfo":
                    gps_data = {}
                    for g_tag in value:
                        g_name = gps_tags_map.get(g_tag, str(g_tag))
                        gps_data[g_name] = value[g_tag]

                    lat = cls._convert_to_degrees(gps_data.get("GPSLatitude"))
                    lat_ref = gps_data.get("GPSLatitudeRef")
                    if lat and lat_ref == "S":
                        lat = -lat

                    lon = cls._convert_to_degrees(gps_data.get("GPSLongitude"))
                    lon_ref = gps_data.get("GPSLongitudeRef")
                    if lon and lon_ref == "W":
                        lon = -lon

                    gps_info = {
                        "detected": True if (lat is not None or lon is not None) else False,
                        "latitude": lat,
                        "longitude": lon,
                        "altitude": str(gps_data.get("GPSAltitude", "")),
                    }
                else:
                    try:
                        exif_tags[tag_name] = str(value)
                    except Exception:
                        pass

            camera = {
                "make": exif_tags.get("Make"),
                "model": exif_tags.get("Model"),
                "date_taken": exif_tags.get("DateTimeOriginal") or exif_tags.get("DateTime"),
                "software": exif_tags.get("Software"),
                "lens_model": exif_tags.get("LensModel"),
                "serial_number": exif_tags.get("BodySerialNumber") or exif_tags.get("SerialNumber"),
            }

            return {
                "has_exif": len(exif_tags) > 0,
                "tags": exif_tags,
                "gps": gps_info,
                "camera": camera,
            }
        except Exception:
            return {
                "has_exif": False,
                "tags": {},
                "gps": {"detected": False},
                "camera": {},
            }
