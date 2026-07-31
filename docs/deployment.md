# Deployment Guide

## Running locally with Docker Compose

```bash
docker-compose up --build
```
Access points:
- Frontend Dashboard: `http://localhost:3000`
- Backend API Docs: `http://localhost:8000/docs`

## Manual Local Setup

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
