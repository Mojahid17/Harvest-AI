from flask import Blueprint, request, jsonify
import joblib
import numpy as np

recommendation_bp = Blueprint(
    "recommendation",
    __name__
)

# Load Model and Encoders
model = joblib.load(
    "model/crop_recommendation.pkl"
)

crop_encoder = joblib.load(
    "model/crop_label_encoder.pkl"
)

state_encoder = joblib.load(
    "model/state_encoder.pkl"
)

season_encoder = joblib.load(
    "model/season_encoder.pkl"
)

# Test Route
@recommendation_bp.route(
    "/test-recommend",
    methods=["GET"]
)
def test_recommend():

    return jsonify({
        "message": "Recommendation API Working"
    })


# Crop Recommendation Route
@recommendation_bp.route(
    "/recommend-crop",
    methods=["POST"]
)
def recommend_crop():

    try:

        data = request.json

        crop_year = int(
            data["Crop_Year"]
        )

        state = data["State"].strip()

        season = data["Season"].strip()

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

        state_encoded = state_encoder.transform(
            [state]
        )[0]

        season_encoded = season_encoder.transform(
            [season]
        )[0]

        features = np.array([[
            crop_year,
            state_encoded,
            season_encoded,
            area,
            rainfall,
            fertilizer,
            pesticide
        ]])

        probabilities = model.predict_proba(
            features
        )[0]

        top3_idx = np.argsort(
            probabilities
        )[-3:][::-1]

        recommendations = []

        for idx in top3_idx:

            crop = crop_encoder.inverse_transform(
                [idx]
            )[0]

            confidence = round(
                float(probabilities[idx]) * 100,
                2
            )

            recommendations.append({
                "crop": crop,
                "confidence": confidence
            })

        return jsonify({
            "recommendations": recommendations
        })

    except Exception as e:

        print("ERROR:", e)

        return jsonify({
            "error": str(e)
        }), 500