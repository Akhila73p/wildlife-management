from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.database.base import Base


class Detection(Base):

    __tablename__ = "detections"

    id = Column(Integer, primary_key=True, index=True)

    image_name = Column(String)

    animal = Column(String)

    confidence = Column(Float)

    detected_at = Column(
        DateTime,
        default=datetime.utcnow
    )