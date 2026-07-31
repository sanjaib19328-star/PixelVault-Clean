import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["platform"] == "PixelVault-Clean"
    assert data["api_v1"] == "/api/v1"


def test_health_endpoint():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"


def test_upload_missing_file():
    response = client.post("/api/v1/images/upload")
    assert response.status_code == 422  # Unprocessable Entity (missing file payload)
