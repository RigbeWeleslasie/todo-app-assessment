# Task Tracker - Full Stack Todo App

A simple, modern task management app built with **React** on the frontend and **Laravel** on the backend.  
It’s designed to be fast, responsive, and easy to use - with automatic device-based task isolation (no login required).

---

## Live Demo

- Frontend: https://todo-app-assessment-git-main-rigbes-projects.vercel.app/  
- Backend API: https://todo-app-assessment-production.up.railway.app/api/tasks  

---

## Features

- Create, edit, and delete tasks (CRUD)
- Priority levels: Low, Medium, High (color-coded)
- Due dates with validation (today + future only)
- Calendar view for better visualization
- Task filtering (All, Pending, Completed)
- Progress tracker showing completion percentage
- Device-based isolation (each device sees its own tasks)
- Fully responsive (mobile + desktop)
- Instant UI updates

---

## Tech Stack

### Frontend
- React 19
- Tailwind CSS 3
- Axios
- Vercel (deployment)

### Backend
- Laravel (PHP 8.2)
- MySQL
- Docker
- Railway (deployment)

---

### Prerequisites

- Node.js >= 18
- PHP >= 8.2
- Composer
- MySQL

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/RigbeWeleslasie/todo-app-assessment.git
cd todo-app-assessment/frontend

# Install dependencies
npm install

# Create environment file
echo "REACT_APP_API_URL=https://todo-app-assessment-production.up.railway.app/api/" > .env

# Start development server
npm start
```

### Backend Setup

```bash
cd todo-app-assessment/backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Configure your database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_app
DB_USERNAME=root
DB_PASSWORD=

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate

# Start development server
php artisan serve
```

---

## API Endpoints

All endpoints require the `X-Device-Token` header for device-based isolation.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Get all tasks for device |
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks/{id}` | Get a specific task |
| `PUT` | `/api/tasks/{id}` | Update a task |
| `DELETE` | `/api/tasks/{id}` | Delete a task |

### Example Request

```bash
curl -X POST https://todo-app-assessment-production.up.railway.app/api/tasks \
  -H "Content-Type: application/json" \
  -H "X-Device-Token: device-token" \
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

This app uses a unique device token stored in `localStorage` to isolate tasks per device — no login required.

```javascript
// Auto-generated on first visit and stored in localStorage
const token = 'dt_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
localStorage.setItem('device_token', token);
```

Every API request sends this token via the `X-Device-Token` header. The backend filters tasks by this token, ensuring each device only sees its own tasks.

---

## Docker & Deployment

### Backend(Laravel — Railway (Docker)
### Railway Environment Variables

| Variable | Description |
|---|---|
| `APP_KEY` | Laravel application key |
| `APP_ENV` | `production` |
| `APP_DEBUG` | `false` |
| `DB_CONNECTION` | `mysql` |
| `DB_HOST` | `${{MySQL.MYSQLHOST}}` |
| `DB_PORT` | `${{MySQL.MYSQLPORT}}` |
| `DB_DATABASE` | `${{MySQL.MYSQL_DATABASE}}` |
| `DB_USERNAME` | `${{MySQL.MYSQLUSER}}` |
| `DB_PASSWORD` | `${{MySQL.MYSQLPASSWORD}}` |

### Frontend — Vercel

The frontend is deployed automatically on every push to `main` via Vercel's GitHub integration.

**Environment Variables on Vercel:**
```
REACT_APP_API_URL=https://todo-app-assessment-production.up.railway.app/api
```

---

## Backend Validation Rules

| Field | Rules |

---

## Development Challenges & Solutions

| Challenge | Solution |
|---|---|
| MySQL socket connection error | Added `DB_SOCKET=` (empty) to force TCP |
| DB variables not resolving | Used Railway's `${{MySQL.VARIABLE}}` reference syntax |
| Duplicate migration columns | Used `Schema::hasColumn()` guard |
| Container stopping immediately | Removed conflicting `railway.json` start command |
| Tasks visible to all devices | Implemented device token isolation via `X-Device-Token` header |

---


