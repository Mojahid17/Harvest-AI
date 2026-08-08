import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

from xgboost import XGBClassifier

# =====================================
# Load Dataset
# =====================================

df = pd.read_csv("crop_yield.csv")

# =====================================
# Data Cleaning
# =====================================

df["Crop"] = df["Crop"].astype(str).str.strip()

df["State"] = df["State"].astype(str).str.strip()

df["Season"] = df["Season"].astype(str).str.strip()



print(f"\nTotal Crops: {df['Crop'].nunique()}")

print(f"Total Rows: {len(df)}")



# =====================================
# Label Encoding
# =====================================

state_encoder = LabelEncoder()

season_encoder = LabelEncoder()

crop_encoder = LabelEncoder()

df["State"] = state_encoder.fit_transform(
    df["State"]
)

df["Season"] = season_encoder.fit_transform(
    df["Season"]
)

df["Crop"] = crop_encoder.fit_transform(
    df["Crop"]
)

# =====================================
# Features
# =====================================

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

y = df["Crop"]

# =====================================
# Train Test Split
# =====================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# =====================================
# XGBoost Model
# =====================================

model = XGBClassifier(
    n_estimators=1500,
    max_depth=10,
    learning_rate=0.03,
    subsample=0.9,
    colsample_bytree=0.9,
    objective="multi:softprob",
    eval_metric="mlogloss",
    random_state=42,
    n_jobs=-1
)

# =====================================
# Train
# =====================================

print("\nTraining Model...")

model.fit(
    X_train,
    y_train
)

# =====================================
# Top-1 Accuracy
# =====================================

y_pred = model.predict(X_test)

top1_accuracy = accuracy_score(
    y_test,
    y_pred
)

print(
    f"\nTop-1 Accuracy: {top1_accuracy:.4f}"
)

# =====================================
# Top-3 Accuracy
# =====================================

y_proba = model.predict_proba(
    X_test
)

top3_predictions = y_proba.argsort(
    axis=1
)[:, -3:]

correct = 0

for i, actual in enumerate(y_test):

    if actual in top3_predictions[i]:
        correct += 1

top3_accuracy = correct / len(y_test)

print(
    f"Top-3 Accuracy: {top3_accuracy:.4f}"
)

# =====================================
# Save Model
# =====================================

pickle.dump(
    model,
    open(
        "model/crop_recommendation.pkl",
        "wb"
    )
)

pickle.dump(
    state_encoder,
    open(
        "model/state_encoder.pkl",
        "wb"
    )
)

pickle.dump(
    season_encoder,
    open(
        "model/season_encoder.pkl",
        "wb"
    )
)

pickle.dump(
    crop_encoder,
    open(
        "model/crop_label_encoder.pkl",
        "wb"
    )
)

print(
    "\nCrop Recommendation Model Saved Successfully"
)