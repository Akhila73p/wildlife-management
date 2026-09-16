from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.detection import Detection


def get_analytics(db: Session, user_email: str = None):

    query = db.query(Detection)
    if user_email:
        query = query.filter(Detection.user_email == user_email)

    total = query.count()

    species_query = db.query(
        Detection.animal,
        func.count(Detection.id).label("count")
    )
    if user_email:
        species_query = species_query.filter(Detection.user_email == user_email)

    species = species_query.group_by(Detection.animal).all()

    # Convert SQLAlchemy rows into JSON
    species_list = []

    for animal, count in species:

        species_list.append(
            {
                "animal": animal,
                "count": count
            }
        )

    return {
        "total_detections": total,
        "species_count": species_list
    }