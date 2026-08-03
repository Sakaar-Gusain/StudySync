from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, engine, Base
import model,schemas
from load_model import predict_score
from auth import hash_password, verify_password
from sqlalchemy import func
app = FastAPI()

# creates tables if they don't exist 
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","https://study-sync-blush-five.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(model.User).filter(model.User.gmail == user.gmail).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = model.User(
        gmail=user.gmail,
        name=user.name,
        password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.post("/login", response_model=schemas.UserResponse)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(model.User).filter(model.User.gmail == user.gmail).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return db_user

@app.post("/log-habits", response_model=schemas.InformationResponse)
def add(student_id: int, info: schemas.InformationCreate, db: Session = Depends(get_db)):
    db_user = db.query(model.User).filter(model.User.student_id == student_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # save the entry to db
    new_info = model.Information(
        student_id=student_id,
        study_hours_per_day=info.study_hours_per_day,
        attendance_percentage=info.attendance_percentage,
        social_media_hours=info.social_media_hours,
        netflix_hours=info.netflix_hours,
        part_time_job=info.part_time_job,
        sleep_hours=info.sleep_hours,
        extracurricular_participation=info.extracurricular_participation,
    )
    new_info.predicted_score = predict_score(new_info)

    db.add(new_info)
    db.commit()
    db.refresh(new_info)

    return new_info


@app.post("/demo")
def demo_predict(info: schemas.DemoPrediction):
    predicted = predict_score(info)
    return {"prediction":round(predicted,2)}

@app.get("/dashboard", response_model=list[schemas.InformationResponse])
def get_dashboard(student_id: int, db: Session = Depends(get_db)):
    records = (
        db.query(model.Information)
        .filter(model.Information.student_id == student_id)
        .order_by(model.Information.created_at.asc())
        .all()
    )
    if not records:
        raise HTTPException(status_code=404, detail="No records found for this student")

    return records
    

#Dashboard summary KPI cards

@app.get("/summary")
def get_summary(student_id: int, db: Session = Depends(get_db)):
    result = db.query(
        func.avg(model.Information.study_hours_per_day).label("avg_study_hours"),
        func.avg(model.Information.attendance_percentage).label("avg_attendance"),
        func.avg(model.Information.sleep_hours).label("avg_sleep"),
        func.avg(model.Information.predicted_score).label("avg_predicted_score"),
        func.count(model.Information.id).label("total_entries"),
    ).filter(model.Information.student_id == student_id).first()

    if result.total_entries == 0:
        raise HTTPException(status_code=404, detail="No data found for this student")

    latest_entry = (
        db.query(model.Information)
        .filter(model.Information.student_id == student_id)
        .order_by(model.Information.created_at.desc())
        .first()
    )
    return {
        "avg_study_hours": round(result.avg_study_hours, 2) if result.avg_study_hours else None,
        "avg_attendance": round(result.avg_attendance, 2) if result.avg_attendance else None,
        "avg_sleep": round(result.avg_sleep, 2) if result.avg_sleep else None,
        "avg_predicted_score": round(result.avg_predicted_score, 2) if result.avg_predicted_score else None,
        "newest": round(latest_entry.predicted_score, 2) if latest_entry else None,
    }