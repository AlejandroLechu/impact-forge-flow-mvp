from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db
from .. import models, schemas

router = APIRouter(prefix="/probono", tags=["probono"])


@router.post("/offers", response_model=schemas.ProBonoOfferOut)
def create_offer(payload: schemas.ProBonoOfferCreate, db: Session = Depends(get_db)):
    cause = db.query(models.Cause).get(payload.cause_id)
    if not cause:
        raise HTTPException(status_code=404, detail="Cause not found")
    offer = models.ProBonoOffer(
        cause_id=payload.cause_id,
        name=payload.name,
        email=payload.email,
        skills=payload.skills,
        hours=payload.hours,
    )
    db.add(offer)
    db.commit()
    db.refresh(offer)
    return offer


