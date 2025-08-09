from fastapi import APIRouter, Request, HTTPException, Depends
import stripe
from ..core.config import get_settings
from sqlalchemy.orm import Session
from ..db import get_db
from .. import models

router = APIRouter(prefix="/stripe", tags=["stripe"])


@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    sig = request.headers.get("stripe-signature")
    settings = get_settings()
    if not settings.stripe_webhook_secret:
        raise HTTPException(status_code=400, detail="Stripe webhook not configured")

    try:
        event = stripe.Webhook.construct_event(payload, sig, settings.stripe_webhook_secret)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        cause_id = int(session["metadata"]["cause_id"]) if session.get("metadata") and session["metadata"].get("cause_id") else None
        amount_total = session.get("amount_total", 0) / 100.0
        if cause_id:
            cause = db.query(models.Cause).get(cause_id)
            if cause:
                cause.funds_raised += amount_total
                cause.supporters_count += 1
                db.add(cause)
                db.commit()

    return {"received": True}


