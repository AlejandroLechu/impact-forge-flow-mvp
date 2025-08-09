from functools import lru_cache
from pydantic import BaseModel
import os


class Settings(BaseModel):
    # Default to SQLite for easy local dev if DATABASE_URL not provided
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./impact_dev.db")
    secret_key: str = os.getenv("SECRET_KEY", "changeme")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
    stripe_api_key: str | None = os.getenv("STRIPE_API_KEY")
    stripe_webhook_secret: str | None = os.getenv("STRIPE_WEBHOOK_SECRET")
    openai_api_key: str | None = os.getenv("OPENAI_API_KEY")
    elastic_cloud_id: str | None = os.getenv("ELASTIC_CLOUD_ID")
    elastic_api_key: str | None = os.getenv("ELASTIC_API_KEY")
    backend_cors_origins: str = os.getenv("BACKEND_CORS_ORIGINS", "http://localhost:5173")


@lru_cache
def get_settings() -> Settings:
    return Settings()


