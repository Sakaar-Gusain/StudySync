# StudySync - Marks Prediction Fullstack webapp

A full stack web app trained on Linear Regression model based on supervised learning to predict marks based on 5 numeric parameters and 2 categorical parameters. 

Website link:-`https://study-sync-blush-five.vercel.app`

# Technologies used

## Frontend
- ReactJS
- TailwindCSS
- NextJS
- JavaScript

## Backend
- Python
- FastAPI
- PostgresSQL

## Data Science and Analysis
- Python
- Libraries like Numpy, Pandas for data cleaning
- Matplotlib for graph plotting
- Scikit-Learn for model training and parameter tuning

# Folder Structure

## Backend

### Folder Structure:
- **`main.py`** — FastAPI app entry point; defines all API routes (register, log-habits, demo prediction, dashboard summary/history).
- **`model.py`** — SQLAlchemy ORM models defining the database tables (`User`, `Information`).
- **`schemas.py`** — Pydantic schemas for request validation and response serialization (`InformationCreate`, `InformationResponse`).
- **`database.py`** — Database engine and session setup, including the `get_db` dependency used across routes.
- **`load_model.py`** — Loads the trained ML model and exposes `predict_score()` to generate exam score predictions from habit inputs.
- **`LinearRegression.pkl`** — Pre-trained scikit-learn Linear Regression model used for score prediction (loaded once at startup).
- **`auth.py`** — Responsible for converting password into encrypted form to be stored in database. 

### Libraries Information:

- **FastAPI** — core web framework for building the REST API.
- **Uvicorn** — ASGI server used to run the FastAPI app.
- **Starlette** — underlying ASGI toolkit that FastAPI is built on.

#### Database & ORM
- **SQLAlchemy** — ORM for defining models and querying the database.
- **PyMySQL** — MySQL driver used by SQLAlchemy for database connections.
- **psycopg2-binary** — PostgreSQL driver (used for Supabase/Postgres connections).
- **greenlet** — required by SQLAlchemy for async/concurrency support.

#### Data Validation
- **Pydantic** — data validation and serialization for request/response schemas.
- **email-validator** — validates email fields in Pydantic schemas.

#### Authentication & Security
- **passlib** — password hashing utilities.
- **bcrypt** — hashing algorithm backend used by passlib.
- **python-jose** — creates and verifies JWT tokens for authentication.
- **cryptography** — underlying cryptographic operations for JWT/security.

#### Machine Learning
- **scikit-learn** — trains and runs the Linear Regression model for score prediction.
- **numpy** — numerical operations and feature array formatting.
- **pandas** — data handling/preprocessing during model training.
- **scipy** — scientific computing utilities used by scikit-learn.
- **joblib** — loads the pre-trained `.pkl` model file at startup.
- **threadpoolctl** — manages thread pools for scikit-learn's internal parallelism.

#### Config & Utilities
- **python-dotenv** — loads environment variables (e.g. database URL) from a `.env` file.
- **python-dateutil** — date parsing utilities.


## Frontend:

### Features:

- User Authentication (Login and Signup)
- Marks prediction form
- Interactive charts for progress tracking
- Responsive UI
- FastAPI backend 

### About folder structure:

- **/context/AuthContext.jsx** – Provides global authentication state across the application. It manages the authenticated user, stores the authentication token, and exposes methods for login, logout, and authentication checks.

- **/components** – Contains reusable UI components that can be shared across multiple pages to promote consistency and reduce code duplication.

- **/app/home** – The application's landing page, providing an overview of the platform and serving as the first page users see when visiting the website.

- **/app/login** – Allows existing users to securely sign in to their accounts.

- **/app/register** – Enables new users to create an account and securely stores their information in the database.

- **/app/study-habits** – Allows users to enter their study habits and related information, generates a predicted score using the trained machine learning model, and stores the prediction history in the database.

- **/app/dashboard** – Displays a personalized analytics dashboard where users can track their historical predictions, monitor progress over time, and gain insights into their study performance.

