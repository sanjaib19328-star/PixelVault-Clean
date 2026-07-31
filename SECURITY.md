# Security Policy

## Security Overview
PixelVault Clean is a digital image forensics and provenance analysis toolkit designed with a privacy-first architecture.

## Principles
1. **Zero Permanent Storage**: Uploaded files are processed in temporary isolation and purged immediately after sanitization or session expiration.
2. **Input Validation**: All uploaded files are strictly validated for magic byte headers, extension, MIME type, and file size limits (15MB max).
3. **No Unsafe Execution**: Image headers are parsed in isolated python memory buffers without executing embedded code segments.

## Reporting Vulnerabilities
If you discover a security vulnerability in PixelVault Clean, please report it via private email or security advisory rather than public issues.
