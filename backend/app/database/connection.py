from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

from app.database.base import Base
from app.models.user import User
from app.models.detection import Detection

# Load environment variables
load_dotenv()

# Read database URL (defaulting to SQLite if PostgreSQL URL is not set)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./wildlife.db")

# Fix Render postgres:// schema if present
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Create database engine
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

# Create session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Create all tables safely and seed default accounts
try:
    Base.metadata.create_all(bind=engine)
    
    # Ensure user_email column exists in existing detections table
    try:
        with engine.connect() as conn:
            conn.execute(text("ALTER TABLE detections ADD COLUMN IF NOT EXISTS user_email VARCHAR;"))
            conn.commit()
    except Exception:
        pass
    
    # Auto-seed default accounts so login is always available without re-registering
    from app.utils.security import hash_password
    _seed_db = SessionLocal()
    try:
        default_accounts = [
            {
                "full_name": "Wildlife Admin",
                "email": "admin@wildlife.com",
                "password": hash_password("Admin123!"),
                "role": "admin"
            },
            {
                "full_name": "Student User",
                "email": "student@wildlife.com",
                "password": hash_password("Student123!"),
                "role": "student"
            }
        ]
        for acc in default_accounts:
            if not _seed_db.query(User).filter(User.email == acc["email"]).first():
                _seed_db.add(User(**acc))
        _seed_db.commit()
    finally:
        _seed_db.close()
except Exception as err:
    print(f"Database table initialization notice: {err}")

# Database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()