# School Management System – Student Management Module

A full-stack Student Management System built using React, Django REST Framework, PostgreSQL, and JWT Authentication.

## Live Demo

Frontend:
https://student-management-system-nine-wheat.vercel.app/

Backend:
https://student-management-system-jxvi.onrender.com

### Admin Credentials

Username: admin

Password: admin123

---

## Important Note

The backend is hosted on Render Free Tier.

The first API request after inactivity may take 30–60 seconds to respond while the server wakes up. Subsequent requests will be much faster.

---

## Features

### Authentication

* JWT Login
* Token Refresh
* Logout with Refresh Token Blacklisting

### Student Management

* Create Student
* View Student
* Update Student
* Delete Student (Soft Delete)
* Restore Student
* Permanent Delete Student
* Pagination
* Search
* Filtering
* Ordering

### Security

* Role-Based Access Control
* Admin-Only Protected Actions
* JWT Authentication

---

## Technology Stack

### Frontend

* React
* Axios
* React Router

### Backend

* Django
* Django REST Framework
* Simple JWT

### Database

* PostgreSQL

### Deployment

* Vercel
* Render

### API Testing

* Postman

---

## API Endpoints

### Authentication

POST /api/auth/login/

POST /api/auth/refresh/

POST /api/auth/logout/

---

### Students

GET /api/students/

POST /api/students/

GET /api/students/{id}/

PUT /api/students/{id}/

PATCH /api/students/{id}/

DELETE /api/students/{id}/

PATCH /api/students/{id}/restore/

DELETE /api/students/{id}/permanent-delete/

GET /api/students/search/

---

### Health Check

GET /health/

GET /api/health/

---

## Search & Filtering

Supported Query Parameters

* first_name
* last_name
* email
* grade
* is_active

Example:

GET /api/students/search/?grade=10

GET /api/students/search/?is_active=false

GET /api/students/search/?first_name=john

---

## Ordering

Supported Ordering Fields

* first_name
* last_name
* grade
* created_at
* updated_at

Example:

GET /api/students/?ordering=first_name

GET /api/students/search/?ordering=-created_at

---

## Installation

### Backend

```bash
git clone https://github.com/HAMADNM/student-management-system.git

cd backend

python -m venv venv

source venv/bin/activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Configure Environment Variables

```env
SECRET_KEY=

DEBUG=

DATABASE_URL=

ALLOWED_HOSTS=

CORS_ALLOWED_ORIGINS=
```

Run Migrations

```bash
python manage.py migrate
```

Create Superuser

```bash
python manage.py createsuperuser
```

Run Server

```bash
python manage.py runserver
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Project Structure

backend/
├── apps/
│ ├── accounts/
│ ├── students/
│ └── core/
├── school_mgmt/
└── manage.py

frontend/
├── src/
├── components/
├── pages/
└── services/

---

## Submission Highlights

* Full CRUD Implementation
* JWT Authentication
* Soft Delete & Restore
* Permanent Delete
* Search & Filtering
* Pagination
* PostgreSQL Integration
* API Testing with Postman
* Responsive React UI
* Production Deployment on Vercel & Render

---

## Author

Hamad N M

Email: [hamadmoideen111@gmail.com](mailto:hamadmoideen111@gmail.com)

GitHub: https://github.com/HAMADNM

LinkedIn: https://www.linkedin.com/in/hamadnm
