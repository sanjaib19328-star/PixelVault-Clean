# Security & Privacy Architecture

## Image Processing Pipeline Safety
1. **Isolated Headers**: PixelVault Clean extracts image header structures into decoupled Python dictionary objects without executing binary content.
2. **Cryptographic Validation**: Every uploaded image receives a SHA-256 hash immediately upon upload.
3. **C2PA Manifest Stripping**: Content Credentials JUMBF segments are safely removed to prevent device origin tracking.
4. **Temporary Buffer Management**: Files uploaded to `storage/temp` and `storage/uploads` are ephemeral.
