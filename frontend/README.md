# Whitefox Student Management Frontend

React + Vite frontend for the Django Student Management backend.

## Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open the app at `http://localhost:5173`.

## Environment

The frontend expects the backend API base URL in `.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Pages

- `/login`
- `/dashboard`
- `/students`
- `/students/add`
- `/students/:id/edit`

## Backend integration

- Login uses `/api/auth/login/` and stores the access token, refresh token, and user summary in `localStorage`.
- Protected requests retry once through `/api/auth/refresh/` when the access token expires.
- Logout calls `/api/auth/logout/` with the refresh token, then clears local session state.
- Dashboard and active roster reads use `/api/students/`.
- Student filtering supports `search`, `grade`, `first_name`, `last_name`, `email`, `ordering`, `page`, and `page_size`.
- The inactive-record search and restore flow uses admin-only endpoints: `/api/students/search/` and `/api/students/:id/restore/`.
- Create, update, delete, inactive search, and restore require a Django staff account. Non-staff accounts can read active students.

## Palette

- Primary orange/peach: `#F29F67`
- Dark navy: `#1E1E2C`
- Supporting blue: `#3B8FF3`
- Supporting teal: `#34B1AA`
- Supporting yellow/gold: `#E0B50F`
