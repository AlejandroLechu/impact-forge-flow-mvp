## Impact Forge – MVP Stack

Production-ready MVP with React + Vite frontend and FastAPI + Postgres backend.

### Quickstart (Local)

1) Copy env template and set values (do not overwrite your .env):

```sh
cp .env.example .env
```

2) Start database and backend:

```sh
docker compose up --build -d db
docker compose up --build backend
```

3) Seed sample data (one-time):

```sh
docker compose exec backend python -m app.seed
```

4) Start frontend:

```sh
npm i
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:8000

### Stripe Webhook (optional)

Expose webhook endpoint and set secret:

```sh
stripe listen --forward-to localhost:8000/api/stripe/webhook
export STRIPE_WEBHOOK_SECRET=whsec_...
```

### Notes

- Configure `VITE_API_BASE_URL` for frontend API base.
- Set `STRIPE_API_KEY` for live donation checkout.
