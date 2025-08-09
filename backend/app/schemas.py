from pydantic import BaseModel, Field
from typing import Optional, List
import datetime as dt


class TribeOut(BaseModel):
    id: int
    name: str
    description: str
    location: Optional[str] = None

    class Config:
        from_attributes = True


class CauseOut(BaseModel):
    id: int
    name: str
    mission: str
    funding_goal: float = Field(0)
    funds_raised: float = Field(0)
    supporters_count: int = Field(0)
    category: Optional[str] = None
    urgency: Optional[str] = None
    location: Optional[str] = None

    class Config:
        from_attributes = True


class DonationCreate(BaseModel):
    cause_id: int
    amount: float


class DonationOut(BaseModel):
    id: int
    amount: float
    cause_id: int
    created_at: dt.datetime

    class Config:
        from_attributes = True


class ProBonoOfferCreate(BaseModel):
    cause_id: int
    name: str
    email: str
    skills: str
    hours: int

class ProBonoOfferOut(BaseModel):
    id: int
    cause_id: int
    name: str
    email: str
    skills: str
    hours: int
    created_at: dt.datetime

    class Config:
        from_attributes = True


class UserProfileIn(BaseModel):
    user_id: Optional[int] = None
    interests: List[str] = []
    skills: List[str] = []
    location_city: Optional[str] = None
    location_country: Optional[str] = None
    location_lat: Optional[float] = None
    location_lng: Optional[float] = None

class UserProfileOut(BaseModel):
    id: int
    user_id: Optional[int] = None
    interests: List[str] = []
    skills: List[str] = []
    location_city: Optional[str] = None
    location_country: Optional[str] = None
    location_lat: Optional[float] = None
    location_lng: Optional[float] = None
    onboarding_completed_at: Optional[dt.datetime] = None
    created_at: dt.datetime

    class Config:
        from_attributes = True


