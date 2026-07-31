from app.schemas.image_schema import EXIFMetadata
from app.services.forensic.exif import EXIFExtractor
from app.services.forensic.xmp import XMPParser


class MetadataService:
    @staticmethod
    def extract_exif(file_bytes: bytes) -> EXIFMetadata:
        data = EXIFExtractor.extract_exif(file_bytes)
        camera = data.get("camera", {})
        gps = data.get("gps", {})
        tags = data.get("tags", {})

        return EXIFMetadata(
            has_exif=data.get("has_exif", False),
            camera_make=camera.get("make"),
            camera_model=camera.get("model"),
            date_taken=camera.get("date_taken"),
            lens_model=camera.get("lens_model"),
            serial_number=camera.get("serial_number"),
            software=camera.get("software"),
            gps_detected=gps.get("detected", False),
            gps_latitude=gps.get("latitude"),
            gps_longitude=gps.get("longitude"),
            gps_altitude=gps.get("altitude"),
            raw_tags=tags,
        )

    @staticmethod
    def inspect_xmp_iptc(file_bytes: bytes) -> dict:
        return XMPParser.extract_xmp_iptc(file_bytes)
