from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import stripe
from ..core.config import get_settings
from ..db import get_db
from .. import models, schemas

router = APIRouter(prefix="/donations", tags=["donations"])


@router.post("/create-checkout-session")
def create_checkout_session(payload: schemas.DonationCreate, db: Session = Depends(get_db)):
    settings = get_settings()
    if not settings.stripe_api_key:
        raise HTTPException(status_code=400, detail="Stripe not configured")

    cause = db.query(models.Cause).get(payload.cause_id)
    if not cause:
        raise HTTPException(status_code=404, detail="Cause not found")

    stripe.api_key = settings.stripe_api_key
    session = stripe.checkout.Session.create(
        mode="payment",
        line_items=[
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": f"Donation to {cause.name}"},
                    "unit_amount": int(payload.amount * 100),
                },
                "quantity": 1,
            }
        ],
        success_url="http://localhost:5173/?payment=success",
        cancel_url="http://localhost:5173/?payment=cancel",
        metadata={"cause_id": str(cause.id)},
    )
    return {"id": session.id, "url": session.url}


