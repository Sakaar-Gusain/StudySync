from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
#schema for creating user
class UserCreate(BaseModel):
    name: str
    gmail: EmailStr
    password: str=Field(min_length=6,max_length=18)

#schema for login
class UserLogin(BaseModel):
    gmail: EmailStr
    password: str


class UserResponse(BaseModel):
    student_id: int
    gmail: EmailStr
    name: str

    class Config:
        from_attributes = True

#for creating information
class InformationCreate(BaseModel):
    student_id:int
    study_hours_per_day: int  #reminder i have to change before deplpying
    attendance_percentage: float
    social_media_hours: float
    netflix_hours: float
    part_time_job: bool
    sleep_hours: float
    extracurricular_participation: bool
    

class InformationResponse(InformationCreate):
    id: int
    student_id:int
    predicted_score: float
    created_at: datetime | None=None
    class Config:
        from_attributes = True


class DemoPrediction(BaseModel):
    study_hours_per_day: float
    attendance_percentage: float
    social_media_hours: float
    netflix_hours: float
    part_time_job: bool
    sleep_hours: float
    extracurricular_participation: bool

