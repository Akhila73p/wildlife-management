from sqlalchemy.orm import Session
from app.models.detection import Detection

import pandas as pd
from pathlib import Path


def get_dataset_path():

    project_folder = Path(__file__).resolve().parents[3]

    return (
        project_folder
        / "datasets"
        / "wildlife_population_data.csv"
    )


def get_population_summary(db: Session, user_email: str = None):

    # -------------------------------------------------
    # 1. EXISTING APPLICATION DETECTION DATA
    # -------------------------------------------------

    query = db.query(Detection)
    if user_email:
        query = query.filter(Detection.user_email == user_email)

    detections = (
        query
        .order_by(Detection.detected_at.asc())
        .all()
    )

    total_detections = len(detections)

    animals = set()

    for detection in detections:

        if detection.animal:
            animals.add(detection.animal)

    species_richness = len(animals)

    animal_counts = {}

    for detection in detections:

        animal = detection.animal

        if not animal:
            continue

        animal_counts[animal] = (
            animal_counts.get(animal, 0) + 1
        )

    daily_counts = {}

    for detection in detections:

        if not detection.detected_at:
            continue

        date = detection.detected_at.date().isoformat()

        daily_counts[date] = (
            daily_counts.get(date, 0) + 1
        )

    species_data = []

    for animal, count in animal_counts.items():

        species_data.append({
            "animal": animal,
            "detection_count": count
        })

    species_data.sort(
        key=lambda x: x["detection_count"],
        reverse=True
    )

    trend_data = []

    for date, count in daily_counts.items():

        trend_data.append({
            "date": date,
            "detection_count": count
        })

    trend_data.sort(
        key=lambda x: x["date"]
    )


    # -------------------------------------------------
    # 2. WILDLIFE DATASET
    # -------------------------------------------------

    dataset_path = get_dataset_path()

    wildlife_df = pd.read_csv(dataset_path)

    wildlife_observations = len(wildlife_df)

    wildlife_species = int(
        wildlife_df["scientific_name"].nunique()
    )

    wildlife_groups = (
        wildlife_df["iconic_taxon_name"]
        .value_counts()
        .to_dict()
    )


    # -------------------------------------------------
    # 3. TOP OBSERVED SPECIES
    # -------------------------------------------------

    top_species_df = (
        wildlife_df["scientific_name"]
        .value_counts()
        .head(10)
        .reset_index()
    )

    top_species_df.columns = [
        "species",
        "observations"
    ]

    top_species = (
        top_species_df
        .to_dict(orient="records")
    )


    # -------------------------------------------------
    # 4. FINAL RESPONSE
    # -------------------------------------------------

    return {

        "total_detections": total_detections,

        "species_richness": species_richness,

        "species": species_data,

        "daily_trend": trend_data,

        "wildlife_dataset": {

            "total_observations": wildlife_observations,

            "species_count": wildlife_species,

            "groups": wildlife_groups,

            "top_species": top_species

        }

    }


# =====================================================
# SEARCH DATASET SPECIES
# =====================================================

def search_population_species(
    db: Session,
    query: str
):

    # -------------------------------------------------
    # Load wildlife dataset
    # -------------------------------------------------

    dataset_path = get_dataset_path()

    wildlife_df = pd.read_csv(dataset_path)

    search_text = query.strip().lower()


    # -------------------------------------------------
    # Search common name OR scientific name
    # -------------------------------------------------

    common_name_match = (
        wildlife_df["common_name"]
        .fillna("")
        .astype(str)
        .str.lower()
        .str.contains(search_text, regex=False)
    )

    scientific_name_match = (
        wildlife_df["scientific_name"]
        .fillna("")
        .astype(str)
        .str.lower()
        .str.contains(search_text, regex=False)
    )

    filtered_df = wildlife_df[
        common_name_match | scientific_name_match
    ]


    # -------------------------------------------------
    # No results
    # -------------------------------------------------

    if filtered_df.empty:

        return {
            "query": query,
            "results": [],
            "count": 0
        }


    # -------------------------------------------------
    # Group matching records by species
    # -------------------------------------------------

    grouped = (
        filtered_df
        .groupby(
            [
                "scientific_name",
                "common_name",
                "iconic_taxon_name"
            ],
            dropna=False
        )
        .size()
        .reset_index(name="observations")
    )


    # -------------------------------------------------
    # Application detection counts
    # -------------------------------------------------

    detections = db.query(Detection).all()

    application_counts = {}

    for detection in detections:

        if not detection.animal:
            continue

        animal_name = detection.animal.strip().lower()

        application_counts[animal_name] = (
            application_counts.get(animal_name, 0) + 1
        )


    # -------------------------------------------------
    # Prepare results
    # -------------------------------------------------

    results = []

    for _, row in grouped.iterrows():

        common_name = (
            None
            if pd.isna(row["common_name"])
            else str(row["common_name"])
        )

        scientific_name = (
            None
            if pd.isna(row["scientific_name"])
            else str(row["scientific_name"])
        )

        wildlife_group = (
            None
            if pd.isna(row["iconic_taxon_name"])
            else str(row["iconic_taxon_name"])
        )


        # Try common name first for application matching
        detection_key = (
            common_name.lower()
            if common_name
            else scientific_name.lower()
            if scientific_name
            else ""
        )

        detection_count = application_counts.get(
            detection_key,
            0
        )


        results.append({

            "common_name": common_name,

            "scientific_name": scientific_name,

            "wildlife_group": wildlife_group,

            "dataset_observations": int(
                row["observations"]
            ),

            "application_detections": detection_count

        })


    # -------------------------------------------------
    # Sort by dataset observations
    # -------------------------------------------------

    results.sort(
        key=lambda x: x["dataset_observations"],
        reverse=True
    )


    return {

        "query": query,

        "results": results,

        "count": len(results)

    }