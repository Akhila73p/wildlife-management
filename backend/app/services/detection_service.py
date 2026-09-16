from sqlalchemy.orm import Session

from app.models.detection import Detection


def save_detection(
    db: Session,
    image_name: str,
    animal: str,
    confidence: float,
    user_email: str = None
):

    detection = Detection(
        image_name=image_name,
        animal=animal,
        confidence=confidence,
        user_email=user_email
    )

    db.add(detection)
    db.commit()
    db.refresh(detection)

    return detection