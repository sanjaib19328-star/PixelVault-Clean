import io
from PIL import Image
from app.services.forensic.hashing import ImageHasher
from app.services.forensic.exif import EXIFExtractor
from app.services.forensic.report import ForensicReportGenerator


def test_sha256_hasher():
    data = b"pixelvault-test-bytes"
    hash_result = ImageHasher.calculate_sha256(data)
    assert len(hash_result) == 64


def test_exif_extractor_empty_bytes():
    exif = EXIFExtractor.extract_exif(b"")
    assert exif["has_exif"] is False
    assert exif["gps"]["detected"] is False


def test_report_generator():
    report = ForensicReportGenerator.generate_json_report(
        filename="sample.jpg",
        sha256_before="abc",
        filesize_before=1000,
        metadata_found=["EXIF"],
        c2pa_detected=False,
        security_score=85,
    )
    assert report["platform"] == "PixelVault-Clean"
    assert report["filename"] == "sample.jpg"
    assert report["security_analysis"]["security_score"] == 85
