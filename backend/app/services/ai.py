from typing import List, Dict, Any
from ..core.config import get_settings


def is_ai_enabled() -> bool:
    return bool(get_settings().openai_api_key)


def rerank_tribes_with_ai(
    tribes: List[Dict[str, Any]], interests: List[str], skills: List[str], locations: List[str]
) -> List[Dict[str, Any]]:
    """Optionally re-rank tribe suggestions using OpenAI if configured.

    Returns tribes with optional 'score' and 'explanation'.
    """
    if not is_ai_enabled():
        return tribes

    try:
        from openai import OpenAI
    except Exception:
        return tribes

    settings = get_settings()
    client = OpenAI(api_key=settings.openai_api_key)

    # Prepare compact prompt
    system = (
        "You are helping match a user to tribes. Rank tribes by fit using interests, skills, and location. "
        "Return a JSON list of objects: {id, score (0-10), explanation}. Keep explanations short."
    )
    user = {
        "interests": interests,
        "skills": skills,
        "locations": locations,
        "tribes": [
            {"id": t.get("id"), "name": t.get("name"), "description": t.get("description", ""), "location": t.get("location")}
            for t in tribes
        ],
    }

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": str(user)},
            ],
            temperature=0.2,
        )
        content = completion.choices[0].message.content or "[]"
        import json

        ranking = json.loads(content)
        score_map = {item.get("id"): item for item in ranking if isinstance(item, dict) and item.get("id") is not None}
        enriched: List[Dict[str, Any]] = []
        for t in tribes:
            item = score_map.get(t.get("id"))
            if item:
                t = {**t, "score": float(item.get("score", t.get("score", 0.0))), "explanation": item.get("explanation")}
            enriched.append(t)
        enriched.sort(key=lambda x: float(x.get("score", 0.0)), reverse=True)
        return enriched
    except Exception:
        # Fallback to original order
        return tribes


