from flask import Flask
from flask_cors import CORS
from routes.recommendation import recommendation_bp

from routes.prediction import prediction_bp
from routes.admin import admin_bp

from database import db
from flask_jwt_extended import JWTManager
from routes.auth import auth_bp

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "harvest_ai_secret"

jwt = JWTManager(app)
CORS(app)

# SQLite Database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///harvest_ai.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# Create database tables
with app.app_context():
    db.create_all()

# Register routes
app.register_blueprint(prediction_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(recommendation_bp)
@app.route("/")
def home():
    return {"message": "HARVEST AI Backend Running"}

if __name__ == "__main__":
    app.run(debug=True)