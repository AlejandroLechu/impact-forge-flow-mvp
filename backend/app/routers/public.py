from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..db import get_db
from .. import models, schemas
from ..core.config import get_settings

router = APIRouter(prefix="/public", tags=["public"])


@router.get("/tribes", response_model=list[schemas.TribeOut])
def list_tribes(db: Session = Depends(get_db)):
    return db.query(models.Tribe).limit(50).all()


@router.get("/causes", response_model=list[schemas.CauseOut])
def list_causes(db: Session = Depends(get_db)):
    return db.query(models.Cause).limit(50).all()


@router.get("/causes/{cause_id}", response_model=schemas.CauseOut)
def get_cause(cause_id: int, db: Session = Depends(get_db)):
    cause = db.query(models.Cause).get(cause_id)
    if not cause:
        raise HTTPException(status_code=404, detail="Cause not found")
    return cause


@router.get("/config")
def public_config():
    settings = get_settings()
    return {
        "stripe_enabled": settings.stripe_enabled,
    }

