from flask import Blueprint, request, jsonify
import joblib
import numpy as np

from database import db, PredictionHistory

prediction_bp = Blueprint(
    "prediction",
    __name__
)

# Load model
model = joblib.load(
    "model/yield_model.pkl"
)

# Load encoders
state_encoder = joblib.load(
    "model/state_encoder.pkl"
)

season_encoder = joblib.load(
    "model/season_encoder.pkl"
)


@prediction_bp.route(
    "/predict",
    methods=["POST"]
)
def predict():

    try:

        print("\n===== PREDICT API HIT =====")

        data = request.json

        print("REQUEST DATA:", data)

        crop_year = int(
            data["Crop_Year"]
        )

        state = (
            data["State"]
            .strip()
        )

        season = (
            data["Season"]
            .strip()
        )

        area = float(
            data["Area"]
        )

        rainfall = float(
            data["Annual_Rainfall"]
        )

        fertilizer = float(
            data["Fertilizer"]
        )

        pesticide = float(
            data["Pesticide"]
        )

        print(
            "STATE RECEIVED:",
            repr(state)
        )

        print(
            "SEASON RECEIVED:",
            repr(season)
        )

        # Encoder expects fixed spaces
        state_encoded = (
            state_encoder.transform(
                [state]
            )[0]
        )

        season_encoded = (
            season_encoder.transform(
                [season.ljust(11)]
            )[0]
        )

        print(
            "STATE ENCODED:",
            state_encoded
        )

        print(
            "SEASON ENCODED:",
            season_encoded
        )

        features = np.array([
            [
                crop_year,
                state_encoded,
                season_encoded,
                area,
                rainfall,
                fertilizer,
                pesticide
            ]
        ])

        prediction = model.predict(
            features
        )

        predicted_yield = float(
            prediction[0]
        )

        print(
            "PREDICTED YIELD:",
            predicted_yield
        )

        # Save history
        history = PredictionHistory(
            crop_year=crop_year,
            state=state,
            season=season,
            area=area,
            rainfall=rainfall,
            fertilizer=fertilizer,
            pesticide=pesticide,
            predicted_yield=predicted_yield
        )

        db.session.add(history)

        db.session.commit()

        return jsonify({
            "predicted_yield":
            round(
                predicted_yield,
                2
            )
        })

    except Exception as e:

        print(
            "\n===== ERROR ====="
        )

        print(e)

        return jsonify({
            "error": str(e)
        }), 500