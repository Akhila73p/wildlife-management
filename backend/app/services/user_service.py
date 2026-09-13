from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user_schema import UserCreate
from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token
)


ALLOWED_ROLES = {
    "student",
    "research_officer",
    "forest_officer",
    "admin"
}


# REGISTER USER
def create_user(db: Session, user: UserCreate):

    # Check role
    if user.role not in ALLOWED_ROLES:
        return None

    # Check if email already exists
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        return None

    # Create new user
    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# LOGIN USER
def login_user(db: Session, email: str, password: str):

    # Find user
    user = db.query(User).filter(
        User.email == email
    ).first()

    if user is None:
        return None

    # Check password
    if not verify_password(password, user.password):
        return None

    # Create JWT with user information
    token = create_access_token(
        {
            "sub": user.email,
            "role": user.role,
            "full_name": user.full_name
        }
    )

    return token