# Changelog

## [1.0.0] - 2026-07-31

### Added
- **Image Forensics & Provenance Engine**: Deep EXIF, XMP, IPTC, and C2PA Content Credentials inspection.
- **Cryptographic SHA-256 Hashing**: Verification of image integrity before and after metadata sanitization.
- **Forensic Security Dashboard**: Overall Security Score (0-100), risk levels, metadata indicator badges, and raw tag inspection.
- **Security Report Export**: Downloadable JSON forensic reports (`/api/v1/images/{id}/report`).
- **Versioned API Structure**: `/api/v1` routes using FastAPI and Pydantic schemas.
- **Frontend Architecture**: Split Zustand stores (`uploadStore`, `scanStore`, `reportStore`, `settingsStore`), modular layout components, dark forensic UI.
- **Docker & CI/CD**: `docker-compose.yml`, multi-stage Dockerfiles, GitHub Actions workflow.
