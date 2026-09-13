import hashlib
import secrets
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "wildlife_secret_key_2026"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


# Hash password
def hash_password(password: str):
    salt = secrets.token_hex(16)

    hashed = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode(),
        salt.encode(),
        100000
    )

    return f"{salt}${hashed.hex()}"


# Verify password
def verify_password(plain_password: str, hashed_password: str):

    try:
        salt, stored_hash = hashed_password.split("$")

        hashed = hashlib.pbkdf2_hmac(
            "sha256",
            plain_password.encode(),
            salt.encode(),
            100000
        )

        return secrets.compare_digest(
            hashed.hex(),
            stored_hash
        )

    except Exception:
        return False


# Create JWT token
def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode["exp"] = expire

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )