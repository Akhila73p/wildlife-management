from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import engine

from app.api.user_routes import router as user_router
from app.api.detection_routes import router as detection_router
from app.api.audio_routes import router as audio_router
from app.api.analytics_routes import router as analytics_router
from app.api.report_routes import router as report_router
from app.api.population_routes import router as population_router
from app.api.conservation_routes import router as conservation_router
from app.api.ecosystem_routes import router as ecosystem_router


app = FastAPI(
    title="Wildlife Population Intelligence System",
    version="1.0.0"
)


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://*.vercel.app",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register Routes
app.include_router(user_router)
app.include_router(detection_router)
app.include_router(audio_router)
app.include_router(analytics_router)
app.include_router(report_router)
app.include_router(population_router)
app.include_router(conservation_router)
app.include_router(ecosystem_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to Wildlife Population Intelligence System"
    }


@app.get("/health")
def health():
    return {
        "status": "Healthy",
        "database": "Connected"
    }