from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class PredictionHistory(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    crop_year = db.Column(
        db.Integer
    )

    state = db.Column(
        db.String(100)
    )

    season = db.Column(
        db.String(100)
    )

    area = db.Column(
        db.Float
    )

    rainfall = db.Column(
        db.Float
    )

    fertilizer = db.Column(
        db.Float
    )

    pesticide = db.Column(
        db.Float
    )

    predicted_yield = db.Column(
        db.Float
    )

    created_at = db.Column(
        db.DateTime,
        default=db.func.now()
    )