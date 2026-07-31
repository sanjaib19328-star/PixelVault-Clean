# pyrefly: ignore [missing-import]
from fastapi import APIRouter, UploadFile, File, HTTPException, Path
from app.schemas.image_schema import ImageScanResult, ImageCleanResponse, ForensicReportResponse
from app.services.image_service import ImageService
from app.services.cleaning_service import CleaningService
from app.services.forensic.report import ForensicReportGenerator

router = APIRouter()


@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    """Validates and temporarily uploads an image file, returning unique file ID and SHA-256 hash."""
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    file_bytes = await file.read()
    content_type = file.content_type or "image/jpeg"
    return ImageService.upload_image_file(file_bytes, file.filename, content_type)


@router.post("/{image_id}/analyze", response_model=ImageScanResult)
async def analyze_image(image_id: str = Path(..., description="The unique ID of the uploaded image")):
    """Analyzes image EXIF, XMP, IPTC, and C2PA content provenance by image ID."""
    if not image_id:
        raise HTTPException(status_code=400, detail="Image ID is required")

    return ImageService.analyze_image_by_id(image_id)


@router.post("/{image_id}/clean", response_model=ImageCleanResponse)
async def clean_image(image_id: str = Path(..., description="The unique ID of the uploaded image")):
    """Strips EXIF, XMP, IPTC metadata and C2PA manifests to produce a clean image output."""
    if not image_id:
        raise HTTPException(status_code=400, detail="Image ID is required")

    return CleaningService.clean_image_by_id(image_id)


@router.get("/{image_id}/report", response_model=ForensicReportResponse)
async def get_image_report(image_id: str = Path(..., description="The unique ID of the image")):
    """Generates a reproducible JSON forensic security report for the image."""
    scan_res = ImageService.analyze_image_by_id(image_id)
    clean_res = None
    try:
        clean_res = CleaningService.clean_image_by_id(image_id)
    except Exception:
        pass

    found = []
    if scan_res.breakdown.exif_found:
        found.append("EXIF")
    if scan_res.breakdown.gps_found:
        found.append("GPS Coordinates")
    if scan_res.breakdown.xmp_found:
        found.append("XMP Packet")
    if scan_res.breakdown.iptc_found:
        found.append("IPTC Profile")
    if scan_res.breakdown.c2pa_found:
        found.append("C2PA Content Credentials")

    report_dict = ForensicReportGenerator.generate_json_report(
        filename=scan_res.filename,
        sha256_before=scan_res.sha256_hash,
        filesize_before=scan_res.file_size_bytes,
        metadata_found=found,
        c2pa_detected=scan_res.breakdown.c2pa_found,
        security_score=scan_res.security_score,
        sha256_after=clean_res.sha256_after if clean_res else None,
        filesize_after=clean_res.file_size_after_bytes if clean_res else None,
        metadata_removed=clean_res.removed_metadata_types if clean_res else [],
    )

    return report_dict


@router.get("/{image_id}/download")
async def download_image(image_id: str = Path(..., description="The unique ID of the image to download")):
    """Downloads the cleaned or processed image file corresponding to the given image ID."""
    if not image_id:
        raise HTTPException(status_code=400, detail="Image ID is required")

    return ImageService.get_download_response(image_id)
