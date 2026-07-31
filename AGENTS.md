# PixelVault-Clean Development Rules

## Project Goal

Build PixelVault-Clean:

An image security platform that:
- Detects C2PA Content Credentials
- Inspects image metadata
- Removes unwanted metadata
- Generates a clean image output

The application must be production structured, not a demo.

---

# Architecture Rules

## Frontend

Technology:

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Framer Motion
- Lucide React


Frontend must communicate only through API services.

Never directly access backend URLs inside components.

All API calls must exist inside:

frontend/src/services/


---

## Backend

Technology:

- Python
- FastAPI
- Pydantic
- SQLAlchemy


Architecture:

Modular Monolith.


Do not create microservices.

Services must remain independent:

services/

- c2pa_service.py
- metadata_service.py
- cleaning_service.py
- image_service.py


Each service must have only one responsibility.


---

# Database Rules

Database:

PostgreSQL


ORM:

SQLAlchemy


Database models must be separated from API schemas.


models:

database/models.py


schemas:

schemas/


Never mix them.


---

# API Rules

All APIs must use versioning.


Example:

/api/v1/images/upload

/api/v1/images/analyze

/api/v1/images/clean


Never create:

/upload

/analyze


---

# Image Processing Rules


Supported formats:

- JPEG
- PNG
- WEBP


Every uploaded file must:

1. Validate extension
2. Validate MIME type
3. Validate file size
4. Generate unique ID
5. Store temporarily
6. Process
7. Delete temporary files


Never permanently store user images without permission.


---

# Security Rules


Implement:

- File size limit
- File type validation
- Random filenames
- Error handling
- CORS configuration


Never trust uploaded files.


---

# Frontend Design Rules


Application identity:

PixelVault Clean


Design theme:

Digital Forensics Laboratory


Avoid:

- Generic AI gradients
- Purple AI themes
- Glassmorphism everywhere
- Robot icons


Use:

Dark forensic interface.


Color palette:

Background:

#080B12


Primary:

#C8FF00


Warning:

#FF5C35


Information:

#00E5FF


Text:

#FFFFFF


---

# Component Rules


Every component must be reusable.

Bad:

components/ImagePageButton.tsx


Good:

components/common/Button.tsx


---

# State Management


Use Zustand only for global state.

Do not put everything into Zustand.


Local UI state:

React useState.


---

# Code Quality Rules


Every file must:

- Have clear naming
- Have proper TypeScript types
- Avoid any
- Avoid duplicate logic
- Include error handling


---

# Development Order


Follow this order:

Phase 1:
Frontend foundation

Phase 2:
Frontend UI

Phase 3:
Backend foundation

Phase 4:
Database integration

Phase 5:
Image processing engine

Phase 6:
Deployment


Do not skip phases.


---

# Important

Before creating a new file:

Check existing architecture.

Do not create unnecessary files.

Do not change folder structure without approval.