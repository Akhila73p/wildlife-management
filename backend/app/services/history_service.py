from sqlalchemy.orm import Session
from app.models.detection import Detection


def get_detection_history(db: Session, user_email: str = None):
    query = db.query(Detection)
    if user_email:
        query = query.filter(Detection.user_email == user_email)
    return query.order_by(Detection.detected_at.desc()).all()