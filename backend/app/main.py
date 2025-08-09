from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import get_settings

from .routers import health, public, donations, stripe_webhook, auth, onboarding, probono
from .db import Base, engine

app = FastAPI(title="Impact Forge API", version="0.1.0")

settings = get_settings()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.backend_cors_origins.split(",")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api")
app.include_router(public.router, prefix="/api")
app.include_router(donations.router, prefix="/api")
app.include_router(stripe_webhook.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(onboarding.router, prefix="/api")
app.include_router(probono.router, prefix="/api")


@app.on_event("startup")
def on_startup():
    # Auto-create tables for dev. In production, use Alembic migrations.
    Base.metadata.create_all(bind=engine)


