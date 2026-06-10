# Student Management System API

A secure and scalable Student Management System API built with **Django REST Framework (DRF)**. This project demonstrates modern backend development practices including **JWT-based authentication**, **Role-Based Access Control (RBAC)**, **Soft Delete & Restore**, **Search**, **Filtering**, **Ordering**, and **Pagination**.

## Overview

The Student Management System provides a centralized platform for managing student records through a RESTful API. The application implements secure authentication and authorization mechanisms while maintaining data integrity through soft deletion and restoration capabilities.

## Key Features

### Authentication & Security

* JWT Authentication using Simple JWT
* Access Token Refresh
* Secure Logout with Token Blacklisting
* Role-Based Access Control (RBAC)
* Custom Permission Classes

### Student Management

* Create Student Records
* Retrieve Student Information
* Update Student Details
* Soft Delete Students
* Restore Deleted Records

### Data Management

* Search Functionality
* Advanced Filtering
* Custom Ordering
* Pagination Support

### API Design

* RESTful Architecture
* Modular Project Structure
* Environment-Based Configuration
* Production-Ready Design

## Technology Stack

| Category        | Technologies                                  |
| --------------- | --------------------------------------------- |
| Backend         | Python, Django, Django REST Framework         |
| Authentication  | Simple JWT                                    |
| Database        | SQLite (Development), PostgreSQL (Production) |
| Deployment      | Render, Vercel                                |
| Version Control | Git, GitHub                                   |

## Project Structure

```text
student-management-system/
│
├── apps/
│   ├── accounts/
│   ├── students/
│   └── core/
│
├── config/
├── manage.py
├── requirements.txt
├── .env.example
└── README.md
```

## API Endpoints

### Authentication

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/login/`   | User Login           |
| POST   | `/api/auth/refresh/` | Refresh Access Token |
| POST   | `/api/auth/logout/`  | Logout User          |

### Students

| Method    | Endpoint                      | Description           |
| --------- | ----------------------------- | --------------------- |
| GET       | `/api/students/`              | List Students         |
| POST      | `/api/students/`              | Create Student        |
| GET       | `/api/students/{id}/`         | Retrieve Student      |
| PUT/PATCH | `/api/students/{id}/`         | Update Student        |
| DELETE    | `/api/students/{id}/`         | Soft Delete Student   |
| PATCH     | `/api/students/{id}/restore/` | Restore Student       |
| GET       | `/api/students/admin/search/` | Admin Search & Filter |

## Access Control

### Administrator

* Create Student Records
* Update Student Records
* Soft Delete Students
* Restore Students
* Access Administrative Search Features

### Authenticated Users

* View Student Information

## Query Parameters

### Search

```http
?search=john
```

### Ordering

```http
?ordering=first_name
```

```http
?ordering=-created_at
```

### Filtering

```http
?grade=A
?email=gmail.com
?first_name=John
?last_name=Doe
```

### Admin Filters

```http
?is_active=true
?is_active=false
```

## Local Setup

```bash
git clone https://github.com/YOUR_USERNAME/student-management-system.git

cd student-management-system

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py createsuperuser

python manage.py runserver
```

## Deployment

| Service     | Platform   |
| ----------- | ---------- |
| Backend API | Render     |
| Frontend    | Vercel     |
| Database    | PostgreSQL |

## Future Enhancements

* API Documentation (Swagger/OpenAPI)
* Automated Testing
* Docker Support
* CI/CD Pipeline
* Audit Logging

## Author

**Hamad N M**

Computer Science & Engineering Graduate
Python Full Stack Developer

LinkedIn: https://www.linkedin.com/in/hamadnm

## License

This project is intended for educational, portfolio, and demonstration purposes.
