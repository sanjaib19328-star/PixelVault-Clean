# PixelVault-Clean Architecture

## Overview
PixelVault-Clean is a specialized application for scanning, inspecting, and sanitizing metadata and C2PA provenance data from digital images.

## Core Components

### 1. Frontend (React + Vite + TypeScript)
- **App Shell & Router**: Router management for Home, Scan, and Result views.
- **Scanner Components**: File drag-and-drop, upload handlers, scan progress animations, and real-time status updates.
- **Report & Download**: Comprehensive metadata analysis dashboard and sanitized file downloader.
- **Store & Hooks**: Zustand state store for file states and custom upload/scan hooks.

### 2. Backend (FastAPI + Python)
- **API Layer**: Modular FastAPI endpoints for health checks (`/api/v1/health`) and image processing (`/api/v1/image`).
- **Services**:
  - `c2pa_service.py`: C2PA manifest parsing and verification.
  - `metadata_service.py`: EXIF, IPTC, and XMP metadata extraction.
  - `cleaning_service.py`: Metadata stripping and privacy sanitization.
  - `image_service.py`: Image format conversion and analysis.
- **Storage & Database**: Storage file manager and SQLAlchemy database models.

### 3. Database & Migrations
- Alembic/SQLAlchemy migration scripts for persistent scan audit logs and user preferences.
