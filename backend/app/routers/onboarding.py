from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from ..db import get_db
from .. import models
from ..services.ai import rerank_tribes_with_ai
from .. import models, schemas
import json
from ..core.config import get_settings
try:
    from openai import OpenAI
except Exception:
    OpenAI = None  # type: ignore

router = APIRouter(prefix="/onboarding", tags=["onboarding"])


class OnboardingRequest(BaseModel):
    interests: List[str]
    skills: List[str]
    location: List[str]


class OnboardingSuggestion(BaseModel):
    id: int
    name: str
    description: str
    location: Optional[str] = None
    score: float
    explanation: Optional[str] = None


@router.post("/suggest-tribes", response_model=List[OnboardingSuggestion])
def suggest_tribes(payload: OnboardingRequest, db: Session = Depends(get_db)):
    tribes = db.query(models.Tribe).all()

    def normalize(text: str) -> str:
        return (text or "").lower()

    interests = {i.lower() for i in payload.interests}
    skills = {s.lower() for s in payload.skills}
    locations = {l.lower() for l in payload.location}

    suggestions: list[OnboardingSuggestion] = []
    for t in tribes:
        name = normalize(t.name)
        desc = normalize(t.description)
        loc = normalize(t.location or "")
        score = 0.0

        # simple matching heuristic
        for i in interests:
            if i in name or i in desc:
                score += 2.0
        for s in skills:
            if s in desc or s in name:
                score += 1.5
        for l in locations:
            if l and l in loc:
                score += 1.0

        suggestions.append(
            OnboardingSuggestion(
                id=t.id,
                name=t.name,
                description=t.description,
                location=t.location,
                score=score,
                explanation=None,
            )
        )

    # AI re-rank when configured
    as_dicts = [s.model_dump() for s in suggestions]
    reranked = rerank_tribes_with_ai(as_dicts, payload.interests, payload.skills, payload.location)
    # sort and return top 5
    reranked.sort(key=lambda x: float(x.get("score", 0.0)), reverse=True)
    top = reranked[:5]
    # map back to model
    return [OnboardingSuggestion(**t) for t in top]


@router.post("/save-profile", response_model=schemas.UserProfileOut)
def save_profile(payload: schemas.UserProfileIn, db: Session = Depends(get_db)):
    # simple upsert by user_id when provided; otherwise create anonymous profile
    profile: models.UserProfile | None = None
    if payload.user_id:
        profile = db.query(models.UserProfile).filter_by(user_id=payload.user_id).first()
    if not profile:
        profile = models.UserProfile(user_id=payload.user_id)
        db.add(profile)

    profile.interests_json = json.dumps(payload.interests or [])
    profile.skills_json = json.dumps(payload.skills or [])
    profile.location_city = payload.location_city
    profile.location_country = payload.location_country
    profile.location_lat = payload.location_lat
    profile.location_lng = payload.location_lng
    db.commit()
    db.refresh(profile)

    return schemas.UserProfileOut(
        id=profile.id,
        user_id=profile.user_id,
        interests=json.loads(profile.interests_json or "[]"),
        skills=json.loads(profile.skills_json or "[]"),
        location_city=profile.location_city,
        location_country=profile.location_country,
        location_lat=profile.location_lat,
        location_lng=profile.location_lng,
        onboarding_completed_at=profile.onboarding_completed_at,
        created_at=profile.created_at,
    )


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatPayload(BaseModel):
    session_id: str
    user_id: int | None = None
    messages: List[ChatMessage]


@router.post("/chat")
def chat(payload: ChatPayload, db: Session = Depends(get_db)):
    # persist messages to session for auditability
    session = db.query(models.OnboardingSession).filter_by(session_id=payload.session_id).first()
    if not session:
        session = models.OnboardingSession(session_id=payload.session_id, user_id=payload.user_id)
        db.add(session)
    session.messages_json = json.dumps([m.model_dump() for m in payload.messages])
    db.commit()
    return {"ok": True}


class AIChatPayload(BaseModel):
    session_id: str
    user_id: int | None = None
    messages: List[ChatMessage]


@router.post("/ai-chat")
def ai_chat(payload: AIChatPayload, db: Session = Depends(get_db)):
    settings = get_settings()
    if not settings.openai_api_key or OpenAI is None:
        last_user = next((m.content for m in reversed(payload.messages) if m.role == "user"), "")
        assistant = f"Thanks! Tell me more: {last_user}" if last_user else "Thanks! What causes do you care about?"
        return {"reply": assistant, "profile_delta": {"interests": [], "skills": []}}

    client = OpenAI(api_key=settings.openai_api_key)
    system = (
        "You are a warm, concise onboarding guide. Carry a short, engaging conversation to collect: "
        "interests (tags), skills (tags), and location (city and country). Always keep replies under 2 sentences. "
        "Respond with a valid JSON object ONLY, with keys: reply (string), profile_delta (object with keys: interests (array of strings), skills (array of strings), location_city (string|optional), location_country (string|optional)). "
        "Do not add any extra keys. If you are unsure, leave fields empty or omit them."
    )
    msgs = [{"role": m.role, "content": m.content} for m in payload.messages]
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "system", "content": system}, *msgs],
            temperature=0.3,
            response_format={"type": "json_object"},
        )
        content = completion.choices[0].message.content or "{}"
        data = json.loads(content)
        reply = data.get("reply") or "Thanks!"
        profile_delta = data.get("profile_delta") or {}
    except Exception:
        reply = "Thanks! What causes do you care about?"
        profile_delta = {}

    session = db.query(models.OnboardingSession).filter_by(session_id=payload.session_id).first()
    if not session:
        session = models.OnboardingSession(session_id=payload.session_id, user_id=payload.user_id)
        db.add(session)
    session.messages_json = json.dumps([
        {"role": m.role, "content": m.content} for m in payload.messages
    ] + [{"role": "assistant", "content": reply}])
    db.commit()

    if payload.user_id:
        profile = db.query(models.UserProfile).filter_by(user_id=payload.user_id).first()
        if not profile:
            profile = models.UserProfile(user_id=payload.user_id)
            db.add(profile)
        try:
            cur_interests = json.loads(profile.interests_json or "[]")
            cur_skills = json.loads(profile.skills_json or "[]")
        except Exception:
            cur_interests, cur_skills = [], []
        new_interests = sorted(set(cur_interests + list(profile_delta.get("interests", []))))
        new_skills = sorted(set(cur_skills + list(profile_delta.get("skills", []))))
        profile.interests_json = json.dumps(new_interests)
        profile.skills_json = json.dumps(new_skills)
        if profile_delta.get("location_city"):
            profile.location_city = profile_delta.get("location_city")
        if profile_delta.get("location_country"):
            profile.location_country = profile_delta.get("location_country")
        db.commit()

    return {"reply": reply, "profile_delta": profile_delta}


