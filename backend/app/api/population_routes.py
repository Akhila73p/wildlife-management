from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database.connection import get_db
from app.services.population_service import (
    get_population_summary,
    search_population_species
)
from app.auth.auth import get_optional_current_user

import pandas as pd
from pathlib import Path


router = APIRouter(
    prefix="/population",
    tags=["Population Intelligence"]
)


@router.get("/summary")
def population_summary(
    db: Session = Depends(get_db),
    current_user: Optional[dict] = Depends(get_optional_current_user)
):
    user_email = current_user.get("email") if current_user else None
    if current_user and current_user.get("role") == "admin":
        user_email = None

    return get_population_summary(db, user_email=user_email)


@router.get("/species-search")
def species_search(
    query: str = Query(..., min_length=1),
    db: Session = Depends(get_db)
):
    return search_population_species(db, query)


@router.get("/locations")
def population_locations():

    project_folder = Path(__file__).resolve().parents[3]

    dataset_path = (
        project_folder
        / "datasets"
        / "wildlife_population_data.csv"
    )

    df = pd.read_csv(dataset_path)

    columns = [
        "scientific_name",
        "common_name",
        "iconic_taxon_name",
        "latitude",
        "longitude",
        "observed_on"
    ]

    df = df[columns].copy()

    df = df.dropna(
        subset=[
            "scientific_name",
            "latitude",
            "longitude"
        ]
    )

    df = df.astype(object).where(
        pd.notna(df),
        None
    )

    df = df.head(3000)

    return df.to_dict(orient="records")