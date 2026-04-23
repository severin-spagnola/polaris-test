# NimbusOps Demo Repo

NimbusOps is a mock B2B operations dashboard for managing customer users, fulfillment orders, and rollout configuration. The repo is intentionally designed to look like a plausible internal product while still being simple enough to demonstrate non-overlapping branch conflicts.

## What is in this repo

- `backend/`: FastAPI API with a small SQLite-backed domain model for users, orders, and public config.
- `frontend/`: React + TypeScript dashboard that consumes the API and renders a realistic SaaS admin UI.
- `qa/`: Test and load-testing area used for demo branch work.

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

## Demo conflict scenarios

The baseline `main` branch is intentionally set up so the following independent branch pairs can be created or inspected:

1. Silent Delete
   Backend removes `account_tier` from the users API because there are no backend-side consumers.
   Frontend adds a new profile component that depends on `account_tier`.
2. Type Change
   Backend migrates `orders.user_id` from `INTEGER` to `UUID` for compliance.
   Frontend hardens the checkout flow with strict integer parsing for `user_id`.
3. Rate Limit
   Backend raises the configured request ceiling from `100` to `10_000` for an enterprise rollout.
   QA adds load tests that hardcode `100` as the assumed ceiling.

Each scenario is designed so the two branches touch different files, which makes the merge look safe even though the behavior drifts.

## Suggested branch names

- `scenario-1/backend-cleanup`
- `scenario-1/frontend-profile-tier`
- `scenario-2/backend-uuid-migration`
- `scenario-2/frontend-checkout-int-parse`
- `scenario-3/backend-enterprise-rate-limit`
- `scenario-3/qa-hardcoded-rate-limit`

