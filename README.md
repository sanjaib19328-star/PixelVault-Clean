# PixelVault-Clean

PixelVault-Clean is an image security, metadata inspection, and C2PA provenance analysis & stripping tool.

## Directory Structure

```
PixelVault-Clean/
├── frontend/             # React + Vite + TypeScript Frontend
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── app/          # Main App shell and Router configuration
│   │   ├── assets/       # Media and static styles/icons
│   │   ├── components/   # Modular React components (common, scanner, report)
│   │   ├── pages/        # Application views (Home, Scan, Result)
│   │   ├── services/     # API Client services
│   │   ├── store/        # State management (Zustand)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── types/        # TypeScript interfaces and definitions
│   │   ├── styles/       # Global CSS styles
│   │   ├── main.tsx      # Application entrypoint
│   │   └── vite-env.d.ts
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── index.html
├── backend/              # FastAPI Python Backend
│   ├── app/
│   │   ├── main.py       # FastAPI app instance and route definitions
│   │   ├── api/routes/   # API Endpoint routes (health, image processing)
│   │   ├── core/         # Configuration & security settings
│   │   ├── services/     # C2PA, metadata, cleaning, and image services
│   │   ├── database/     # SQLAlchemy models and session setup
│   │   ├── storage/      # Local/Cloud file manager
│   │   └── schemas/      # Pydantic models & validation schemas
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env
├── database/
│   └── migrations/       # Database migration scripts
├── docs/
│   └── architecture.md   # Architectural overview documentation
├── .gitignore
└── README.md
```

## Getting Started

### Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
