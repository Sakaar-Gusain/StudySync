from sqlalchemy import Column, Integer, String, ForeignKey, Float, Boolean, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "info_table"

    student_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    gmail = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)  # store hashed password

    tasks = relationship("Information", back_populates="user")


class Information(Base):
    __tablename__ = "student_information"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    student_id = Column(Integer, ForeignKey("info_table.student_id"), nullable=False)
    study_hours_per_day = Column(Integer, nullable=False)
    attendance_percentage = Column(Float, nullable=False)
    social_media_hours = Column(Float, nullable=False)
    netflix_hours = Column(Float, nullable=False)
    part_time_job = Column(Boolean, nullable=False)                   # encoded value
    sleep_hours = Column(Float, nullable=False)
    extracurricular_participation = Column(Boolean, nullable=False)   # encoded value
    predicted_score=Column(Float,nullable=False)
    created_at=Column(DateTime,default=datetime.utcnow,nullable=False)
    user = relationship("User", back_populates="tasks")




    