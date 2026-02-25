# Task Tracker - Full Stack Todo App

A modern, responsive task management application built with React on the frontend and Laravel on the backend. No account or login required - it uses a device-based token system to automatically isolate each user's tasks, keeping everything private to your browser without any sign-up friction.

## Live Demo

**Note:** Due to free tier plan limitations with Railway, the app is currently running on **localhost for local development**.

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api/tasks


## Features

- Create, edit, and delete tasks (full CRUD)
- Priority levels: Low, Medium, High (color-coded)
- Due dates with validation (today and future only)
- Calendar view for better task visualization
- Task filtering: All, Pending, Completed
- Progress tracker showing completion percentage
- Device-based task isolation (no login required)
- Fully responsive layout (mobile + desktop)
- Instant UI updates without page reloads

## Tech Stack

### Frontend
- React, Tailwind CSS, Axios
- Vercel (deployment - ready when upgraded)

### Backend
- Laravel (PHP), MySQL, Docker
- Render (deployment - ready when upgraded)

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
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env
npm start
```

The frontend will start at `http://localhost:3000`

### Backend

```bash
cd todo-app-assessment/backend
composer install
cp .env.example .env

# Configure your database in .env
php artisan key:generate
php artisan migrate
php artisan serve
```

The backend will start at `http://localhost:8000`

## Device-Based Isolation

On first visit, a unique token is generated and stored in localStorage. Every API request sends it via the `X-Device-Token` header, and the backend filters tasks by it - so each device only ever sees its own data.

```javascript
const token = 'dt_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
localStorage.setItem('device_token', token);
```

## API Endpoints

All endpoints require the `X-Device-Token` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks for device |
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks/{id}` | Get a specific task |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |

### Example Request

```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -H "X-Device-Token: your-device-token" \
  -d '{"title": "Buy groceries", "priority": "high", "due_date": "2026-03-01"}'
```

## Deployment

### Backend — Laravel on Localhost (Currently)
The backend is currently running locally for development. Previously deployed on:
- **Railway** - Initial deployment
- **Render** - After Railway free tier limits were exceeded
- **Localhost** - Current development setup (php artisan serve)

To redeploy to Render or Railway when upgrading to a paid plan, configure these environment variables:

| Variable | Value |
|----------|-------|
| APP_KEY | Laravel application key |
| APP_ENV | production |
| APP_DEBUG | false |
| DB_CONNECTION | mysql |
| DB_HOST | your MySQL host |
| DB_PORT | your MySQL port |
| DB_DATABASE | your database name |
| DB_USERNAME | your database username |
| DB_PASSWORD | your database password |

### Frontend — React on Localhost (Currently)
The frontend is currently running locally for development.

To redeploy to Vercel:
1. Push to the `main` branch
2. Set this environment variable on Vercel: `REACT_APP_API_URL=http://your-backend-url/api`

## Backend Validation

The API validates all incoming requests:
- **title** - Required, must be a string
- **description** - Optional
- **due_date** - Must be today or a future date
- **priority** - Accepts `low`, `medium`, or `high`
- **completed** - Boolean flag

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| MySQL socket connection error | Added `DB_SOCKET=` (empty) to force TCP |
| Railway DB variables not resolving | Used `${{MySQL.VARIABLE}}` reference syntax |
| Duplicate migration columns | Used `Schema::hasColumn()` guard |
| Railway free tier limits reached | Migrated backend deployment to Render |
| Render free tier limits reached | Switched to local development with php artisan serve |
| Dockerfile using missing start.sh | Replaced with direct `php -S` server command |
| Tasks visible across all devices | Implemented `X-Device-Token` header isolation |

### Deployment History
- Initially deployed on **Railway** (backend) and **Vercel** (frontend)
- Currently running **locally** due to Render's free tier restrictions

## Running Locally

1. **Start MySQL** - Ensure MySQL is running
2. **Backend** - `cd backend && php artisan serve` (runs on http://localhost:8000)
3. **Frontend** - `cd frontend && npm start` (runs on http://localhost:3000)
4. **Visit** - Open http://localhost:3000 in your browser

---

**Status:** ⚙️ Running locally in development mode. Ready to redeploy to Render/Railway when upgrading to a paid plan.
