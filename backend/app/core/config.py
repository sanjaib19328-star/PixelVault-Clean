# pyrefly: ignore [missing-import]
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "PixelVault-Clean"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "super-secret-key-change-in-production"
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/pixelvault"
    UPLOAD_DIR: str = "./uploads"
    MAX_FILE_SIZE_BYTES: int = 52428800  # 50MB max file size limit
    ALLOWED_EXTENSIONS: set[str] = {"jpg", "jpeg", "png", "webp"}
    ALLOWED_MIME_TYPES: set[str] = {"image/jpeg", "image/png", "image/webp"}
    ALLOWED_ORIGINS: list[str] = [
    "http://localhost:5173",
    "http://localhost:3000",

    "https://pixel-vault-clean.vercel.app",
    "https://pixel-vault-clean-nhx7etlz3-sanjaib19328-4317s-projects.vercel.app",
]
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
