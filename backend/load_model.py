import joblib
import numpy as np
import model
model_pipeline = joblib.load("LinearRegression.pkl")  # load once at startup, not per-request

def predict_score(info: model.Information) -> float:
    features = np.array([[
        info.study_hours_per_day,
        info.attendance_percentage,
        info.social_media_hours,
        info.netflix_hours,
        int(info.part_time_job),
        info.sleep_hours,
        int(info.extracurricular_participation),
    ]])
    prediction = model_pipeline.predict(features)
    prediction = np.clip(prediction, 0, 100)
    return float(prediction[0])