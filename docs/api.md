# PixelVault Clean API v1 Specification

## Base URL
`/api/v1`

## Endpoints

### 1. Health Check
`GET /api/v1/health`

Response:
```json
{
  "status": "ok",
  "version": "1.0.0"
}
```

### 2. Upload Image
`POST /api/v1/images/upload`

Payload: `multipart/form-data` with `file` field.

Response:
```json
{
  "image_id": "9a3f2e1d...",
  "filename": "sample.jpg",
  "sha256_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "file_size_bytes": 1542000
}
```

### 3. Analyze Metadata & Provenance
`POST /api/v1/images/{image_id}/analyze`

Response:
```json
{
  "image_id": "9a3f2e1d...",
  "filename": "sample.jpg",
  "file_size_bytes": 1542000,
  "format": "JPEG",
  "sha256_hash": "...",
  "security_score": 45,
  "risk_level": "HIGH",
  "exif": {
    "has_exif": true,
    "gps_detected": true,
    "camera_make": "Canon",
    "camera_model": "EOS R5"
  },
  "c2pa": {
    "has_c2pa": true,
    "signature_status": "valid"
  }
}
```

### 4. Clean Metadata
`POST /api/v1/images/{image_id}/clean`

Response:
```json
{
  "image_id": "9a3f2e1d...",
  "original_filename": "sample.jpg",
  "cleaned_filename": "clean_sample.jpg",
  "cleaned_file_url": "/api/v1/images/9a3f2e1d/download",
  "sha256_before": "...",
  "sha256_after": "...",
  "removed_metadata_types": ["EXIF", "GPS Coordinates", "C2PA Content Credentials"],
  "new_security_score": 100
}
```

### 5. Download Forensic Security Report
`GET /api/v1/images/{image_id}/report`
