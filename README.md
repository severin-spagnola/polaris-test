# NimbusOps

NimbusOps is an internal B2B operations dashboard for managing customer users, fulfillment orders, and rollout configuration.

## What is in this repo

- `backend/`: FastAPI API with a SQLite-backed domain model for users, orders, and public config.
- `frontend/`: React + TypeScript dashboard that consumes the API and renders the admin UI.
- `qa/`: Test and load-testing area.

## Repo structure

```text
.
├── backend
│   ├── alembic/versions
│   ├── app/api/routes
│   ├── app/config
│   ├── app/core
│   ├── app/db
│   └── app/schemas
├── frontend
│   └── src
│       ├── api
│       ├── components
│       └── pages
└── qa
    └── load
```

## Run locally

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the API at `http://localhost:8000/api` by default.
