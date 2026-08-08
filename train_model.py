import pandas as pd
import joblib
import os

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import r2_score

# ======================
# Load Dataset
# ======================

csv_path = "uploads/crop_yield.csv"

if not os.path.exists(csv_path):
    csv_path = "crop_yield.csv"

df = pd.read_csv(csv_path)

# ======================
# Encode Categorical Data
# ======================

state_encoder = LabelEncoder()
season_encoder = LabelEncoder()

df["State"] = state_encoder.fit_transform(
    df["State"]
)

df["Season"] = state_encoder.fit_transform(
    df["Season"]
)

# ======================
# Features
# ======================

X = df[
    [
        "Crop_Year",
        "State",
        "Season",
        "Area",
        "Annual_Rainfall",
        "Fertilizer",
        "Pesticide"
    ]
]

# ======================
# Target
# ======================

y = df["Yield"]

# ======================
# Split
# ======================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ======================
# Model
# ======================

model = RandomForestRegressor(
    n_estimators=500,
    random_state=42,
    n_jobs=-1
)

model.fit(
    X_train,
    y_train
)

# ======================
# Accuracy
# ======================

preds = model.predict(X_test)

score = r2_score(
    y_test,
    preds
)

print(f"\nR2 Score: {score:.4f}")

# ======================
# Save
# ======================

joblib.dump(
    model,
    "model/yield_model.pkl"
)

joblib.dump(
    state_encoder,
    "model/state_encoder_yield.pkl"
)

joblib.dump(
    season_encoder,
    "model/season_encoder_yield.pkl"
)

print(
    "\nYield Model Saved Successfully"
)