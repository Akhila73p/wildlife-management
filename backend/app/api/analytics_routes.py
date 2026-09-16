from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional

from app.database.connection import get_db
from app.services.analytics_service import get_analytics
from app.auth.auth import get_optional_current_user

router = APIRouter(
    prefix="/analytics",
    tags=["Biodiversity Analytics"]
)


@router.get("/")
def analytics(
    db: Session = Depends(get_db),
    current_user: Optional[dict] = Depends(get_optional_current_user)
):
    user_email = current_user.get("email") if current_user else None
    if current_user and current_user.get("role") == "admin":
        user_email = None

    return get_analytics(db, user_email=user_email)