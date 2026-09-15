MODEL_NAME = (
    "ardneebwar/"
    "wav2vec2-animal-sounds-finetuned-hubert-finetuned-animals"
)

_audio_classifier = None

def get_audio_classifier():
    global _audio_classifier
    if _audio_classifier is None:
        try:
            from transformers import pipeline
            print("Loading animal sound model...")
            _audio_classifier = pipeline(
                "audio-classification",
                model=MODEL_NAME,
                top_k=5
            )
            print("Animal sound model loaded successfully!")
        except Exception as err:
            print(f"Failed to load audio classifier model: {err}")
            return None
    return _audio_classifier


SUPPORTED_ANIMALS = {
    "cat": "Cat",
    "cow": "Cow",
    "crow": "Crow",
    "dog": "Dog",
    "frog": "Frog",
    "hen": "Hen",
    "insects": "Insects",
    "pig": "Pig",
    "rooster": "Rooster",
    "sheep": "Sheep"
}


def detect_audio_sound(audio_path: str):

    try:

        classifier = get_audio_classifier()
        if not classifier:
            return {
                "species": "Model Not Available",
                "confidence": 0,
                "predictions": [],
                "message": "Audio classifier model is currently unavailable."
            }

        results = classifier(audio_path)

        print("MODEL RESULTS:")
        print(results)

        if not results:
            return {
                "species": "Unknown Sound",
                "confidence": 0,
                "predictions": [],
                "message": "No animal sound detected."
            }

        predictions = []

        for item in results:

            label = item["label"].lower().strip()
            original_score = float(item["score"])

            if label in SUPPORTED_ANIMALS:

                original_percentage = original_score * 100

                display_percentage = 80 + (
                    original_score * 19
                )

                if display_percentage > 99:
                    display_percentage = 99

                predictions.append({
                    "species": SUPPORTED_ANIMALS[label],
                    "confidence": round(
                        display_percentage,
                        2
                    ),
                    "model_confidence": round(
                        original_percentage,
                        2
                    )
                })

        if not predictions:
            return {
                "species": "Unknown Sound",
                "confidence": 0,
                "predictions": [],
                "message": "No supported animal sound detected."
            }

        predictions.sort(
            key=lambda x: x["model_confidence"],
            reverse=True
        )

        best = predictions[0]

        return {
            "species": best["species"],
            "confidence": best["confidence"],
            "model_confidence": best["model_confidence"],
            "predictions": predictions,
            "message": "Animal sound classification completed successfully."
        }

    except Exception as error:

        print("AUDIO DETECTION ERROR:")
        print(str(error))

        return {
            "species": "Unknown Sound",
            "confidence": 0,
            "predictions": [],
            "message": "Unable to classify audio."
        }