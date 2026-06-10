# Student Management Backend

Django REST Framework backend for a school student management module.

## Setup

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Endpoints

| Method | URL | Description |
| --- | --- | --- |
| GET | `/health/` | Public health check |
| GET | `/api/health/` | Public API health check |
| POST | `/api/auth/login/` | Get access and refresh tokens |
| POST | `/api/auth/refresh/` | Refresh access token |
| POST | `/api/auth/logout/` | Blacklist refresh token |
| GET/POST | `/api/students/` | List or create students |
| GET/PUT/PATCH/DELETE | `/api/students/<id>/` | Student detail, update, or soft delete |

Use `Authorization: Bearer <access_token>` for protected endpoints.
