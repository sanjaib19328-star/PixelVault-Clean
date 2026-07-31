from typing import Any
from pydantic import BaseModel, Field


class EXIFMetadata(BaseModel):
    has_exif: bool = False
    camera_make: str | None = None
    camera_model: str | None = None
    date_taken: str | None = None
    lens_model: str | None = None
    serial_number: str | None = None
    software: str | None = None

    gps_detected: bool = False
    gps_latitude: float | None = None
    gps_longitude: float | None = None
    gps_altitude: str | None = None

    raw_tags: dict[str, Any] = Field(default_factory=dict)


class C2PAManifest(BaseModel):
    has_c2pa: bool = False
    active_manifest: str | None = None
    claim_generator: str | None = None
    signature_status: str | None = None
    assertions: list[dict[str, Any]] = Field(default_factory=list)


class MetadataBreakdown(BaseModel):
    exif_found: bool = False
    gps_found: bool = False
    xmp_found: bool = False
    iptc_found: bool = False
    icc_profile_found: bool = False
    c2pa_found: bool = False
    tags_count: int = 0


class ImageScanResult(BaseModel):
    image_id: str
    filename: str

    file_size_bytes: int
    mime_type: str | None = None
    format: str
    sha256_hash: str

    dimensions: dict[str, int]

    exif: EXIFMetadata
    c2pa: C2PAManifest
    breakdown: MetadataBreakdown

    security_score: int  # 0 to 100 (100 = completely clean/secure)
    risk_level: str  # LOW, MEDIUM, HIGH, CRITICAL
    has_sensitive_metadata: bool

    status: str | None = "completed"
    job_id: str | None = None


class ImageCleanResponse(BaseModel):
    image_id: str

    original_filename: str
    cleaned_filename: str
    cleaned_file_url: str

    sha256_before: str
    sha256_after: str

    file_size_before_bytes: int
    file_size_after_bytes: int

    removed_metadata_types: list[str] = Field(default_factory=list)
    removed_exif_count: int = 0
    c2pa_stripped: bool = False
    new_security_score: int = 100

    job_id: str | None = None


class ForensicReportResponse(BaseModel):
    platform: str = "PixelVault-Clean"
    version: str = "1.0.0"
    generated_at: str
    filename: str
    provenance: dict[str, Any]
    security_analysis: dict[str, Any]
    performance: dict[str, Any]