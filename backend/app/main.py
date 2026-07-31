from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import logger
from app.middleware.security import SecurityHeadersMiddleware
from app.api.routes import health, image

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Digital Image Forensics & Provenance Analysis Platform API",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

app.add_middleware(SecurityHeadersMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix=settings.API_V1_STR, tags=["health"])
app.include_router(image.router, prefix=f"{settings.API_V1_STR}/images", tags=["images"])


@app.on_event("startup")
async def startup_event():
    logger.info(f"Starting {settings.PROJECT_NAME} API v1.0.0")


@app.get("/")
def root():
    return {
        "platform": settings.PROJECT_NAME,
        "identity": "Digital Image Forensics & Provenance Analysis Platform",
        "version": "1.0.0",
        "docs": "/docs",
        "api_v1": settings.API_V1_STR
    }
