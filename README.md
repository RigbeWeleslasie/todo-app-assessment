# Todo List Application — Intern Technical Assessment

A full-stack Todo List application built with React, Tailwind CSS, Laravel, and MySQL.

## Technologies Used

- **Frontend:** React 19, Tailwind CSS 3
- **Backend:** Laravel 10 (PHP 8.1)
- **Database:** MySQL
- **API:** JSON over HTTP (Axios)

## Setup and Installation

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve --port=8001
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Fetch all tasks |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/{id} | Update a task |
| DELETE | /api/tasks/{id} | Delete a task |

## Features
- Add, view, complete and delete tasks
- Add notes and descriptions to tasks
- Filter by All, Pending, Completed
- Progress bar and stats panel
- Delete confirmation dialog
- Frontend error handling and loading states

## Assumptions and Limitations
- Requires both servers running simultaneously
- Backend on port 8001, Frontend on port 3000
- No authentication implemented
- CORS configured for localhost only

## Author
**Rigbe Weleslasie**
Intern Technical Assessment — February 2026
