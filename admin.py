from flask import Blueprint, jsonify
import pandas as pd
from database import PredictionHistory
from flask import request
import os
import subprocess

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/analytics", methods=["GET"])
def analytics():

    df = pd.read_csv("crop_yield.csv")

    yearly_data = (
        df.groupby("Crop_Year")["Yield"]
        .mean()
        .reset_index()
    )

    result = []

    for _, row in yearly_data.iterrows():

        result.append({
            "year": int(row["Crop_Year"]),
            "yield": round(float(row["Yield"]), 2)
        })

    return jsonify(result)
from database import PredictionHistory

@admin_bp.route("/history", methods=["GET"])
def history():

    records = PredictionHistory.query.order_by(
        PredictionHistory.created_at.desc()
    ).all()

    result = []

    for item in records:

        result.append({
            "rainfall": item.rainfall,
            "fertilizer": item.fertilizer,
            "pesticide": item.pesticide,
            "yield": item.predicted_yield,
            "created_at": item.created_at.strftime("%Y-%m-%d %H:%M")
        })

    return jsonify(result)

@admin_bp.route("/upload-csv", methods=["POST"])
def upload_csv():

    if "file" not in request.files:

        return jsonify({
            "error": "No file uploaded"
        }), 400

    file = request.files["file"]

    if file.filename == "":

        return jsonify({
            "error": "Empty filename"
        }), 400

    upload_path = os.path.join(
        "uploads",
        "crop_yield.csv"
    )

    file.save(upload_path)

    return jsonify({
        "message": "CSV uploaded successfully"
    })

@admin_bp.route("/retrain-model", methods=["POST"])
def retrain_model():

    try:

        subprocess.run(
            ["python", "train_model.py"],
            check=True
        )

        return jsonify({
            "message": "Model retrained successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500