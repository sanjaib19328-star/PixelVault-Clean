import io
from typing import Any
from PIL import Image


class XMPParser:
    @staticmethod
    def extract_xmp_iptc(file_bytes: bytes) -> dict[str, Any]:
        """Extract XMP packets, IPTC metadata, and ICC profile presence."""
        has_xmp = False
        has_iptc = False
        has_icc = False
        xmp_data = {}
        iptc_data = {}

        try:
            image = Image.open(io.BytesIO(file_bytes))
            # Check ICC profile
            has_icc = "icc_profile" in image.info

            # Check XMP in PIL info
            if "xmp" in image.info or "XML:com.adobe.xmp" in image.info:
                has_xmp = True

            # Quick binary check for XMP / IPTC signatures
            if b"http://ns.adobe.com/xap/1.0/" in file_bytes or b"<x:xmpmeta" in file_bytes:
                has_xmp = True
                xmp_data["packet_status"] = "present"

            if b"\x1c\x02" in file_bytes or b"Photoshop 3.0" in file_bytes:
                has_iptc = True
                iptc_data["status"] = "present"

        except Exception:
            pass

        return {
            "has_xmp": has_xmp,
            "has_iptc": has_iptc,
            "has_icc_profile": has_icc,
            "xmp": xmp_data,
            "iptc": iptc_data,
        }
