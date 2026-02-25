# Task Tracker - Full Stack Todo App

A modern, responsive task management application built with **React** on the frontend and **Laravel** on the backend. The app is designed to be fast and frictionless - no account or login required. Instead, it uses a device-based token system to automatically isolate each user's tasks, so your tasks are private to your browser without any sign-up friction.

Users can create tasks with priorities, due dates, and notes, track their progress, filter by status, and manage everything from a clean, mobile-friendly interface.

---

## Live Demo

- **Frontend:** [https://todo-app-assessment-git-main-rigbes-projects.vercel.app/](https://todo-app-assessment-git-main-rigbes-projects.vercel.app/)
- **Backend API:** [https://todo-app-assessment-production.up.railway.app/api/tasks](https://todo-app-assessment-production.up.railway.app/api/tasks)

---

## Features

- Create, edit, and delete tasks (full CRUD)
- Priority levels: Low, Medium, High (color-coded)
- Due dates with validation (today and future dates only)
- Calendar view for better task visualization
- Task filtering: All, Pending, Completed
- Progress tracker showing completion percentage
- Device-based task isolation (no login required - each device sees only its own tasks)
- Fully responsive layout (mobile + desktop)
- Instant UI updates without page reloads

---

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- Vercel (deployment)

### Backend
- Laravel (PHP)
- MySQL
- Docker
- Railway (deployment)

---

## Local Setup

### Prerequisites
- Node.js >= 18
- PHP >= 8.2
- Composer
- MySQL

### Frontend

```bash
git clone https://github.com/RigbeWeleslasie/todo-app-assessment.git
cd todo-app-assessment/frontend

npm install

echo "REACT_APP_API_URL=https://todo-app-assessment-production.up.railway.app/api" > .env

npm start
```

### Backend

```bash
cd todo-app-assessment/backend

composer install

cp .env.example .env

# Configure your database in .env
```

---

## API Endpoints

All endpoints require the `X-Device-Token` header for device-based isolation.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks for device |
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks/{id}` | Get a specific task |
| `PUT` | `/api/tasks/{id}` | Update a task |
| `DELETE` | `/api/tasks/{id}` | Delete a task |

### Example Request

```bash
curl -X POST https://todo-app-assessment-production.up.railway.app/api/tasks \
  -H "Content-Type: application/json" \
  -H "X-Device-Token: your-device-token" \
  -d '{"title": "Buy groceries", "priority": "high", "due_date": "2026-03-01"}'
```

### Example Response

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": null,
  "due_date": "2026-03-01",
  "priority": "high",
  "completed": false,
  "device_token": "dt_abc123_1234567890",
  "created_at": "2026-02-25T10:00:00.000000Z",
  "updated_at": "2026-02-25T10:00:00.000000Z"
}
```

---

## Device-Based Isolation

This app uses a unique token stored in `localStorage` to identify each device - no login required. On a user's first visit, a token is generated and stored in their browser. Every subsequent API request sends this token via the `X-Device-Token` header, and the backend filters tasks by it so each device only ever sees its own data.

```javascript
const token = 'dt_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
localStorage.setItem('device_token', token);
```

---

## Deployment

### Backend - Laravel on Railway (Docker)

The backend is containerized with Docker and deployed on Railway. The following environment variables must be configured in the Railway dashboard:

| Variable | Description |
|----------|-------------|
| `APP_KEY` | Laravel application key |
| `APP_ENV` | `production` |
| `APP_DEBUG` | `false` |
| `DB_CONNECTION` | `mysql` |
| `DB_HOST` | `${{MySQL.MYSQLHOST}}` |
| `DB_PORT` | `${{MySQL.MYSQLPORT}}` |
| `DB_DATABASE` | `${{MySQL.MYSQL_DATABASE}}` |
| `DB_USERNAME` | `${{MySQL.MYSQLUSER}}` |
| `DB_PASSWORD` | `${{MySQL.MYSQLPASSWORD}}` |

### Frontend - React on Vercel

The frontend deploys automatically on every push to `main` via Vercel's GitHub integration. One environment variable is required:

```
REACT_APP_API_URL=https://todo-app-assessment-production.up.railway.app/api
```

---

## Backend Validation Rules
The API validates all incoming requests. The `title` is required and must be a string. `description` is optional. `due_date` must be today or a future date. `priority` accepts `low`, `medium`, or `high`. `completed` is a boolean flag.

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| MySQL socket connection error | Added `DB_SOCKET=` (empty) to force TCP connection |
| Railway DB variables not resolving | Used Railway's `${{MySQL.VARIABLE}}` reference syntax |
| Duplicate migration columns | Used `Schema::hasColumn()` guard before adding columns |
| Container stopping immediately on deploy | Removed conflicting `railway.json` start command |
| Tasks visible across all devices | Implemented device token isolation via `X-Device-Token` header |
