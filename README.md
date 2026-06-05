# Task Manager Application

A full-stack task management application with user authentication, CRUD operations, search, filter, and pagination.

## Features

- User Registration & Login (JWT Authentication)
- Create, Read, Update, Delete Tasks
- Mark tasks as Completed/Pending
- Search tasks by title/description
- Filter tasks by status (All/Pending/Completed)
- Pagination (5 tasks per page)
- Responsive UI
- Protected API routes

## Tech Stack

**Frontend:** React.js (Functional Components, Hooks, React Router DOM, Axios)

**Backend:** Node.js, Express.js, JWT, bcryptjs

**Database:** MongoDB

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB installed locally or MongoDB Atlas URI

### 1. Clone Repository

```bash
git clone <https://github.com/jsr-warrior-21/TaskManagementWebApp.git>
cd assignmentTaskManagement



## How to Run

1. **Start MongoDB** locally: `mongodb` (or use MongoDB Atlas URI in .env)
2. **Backend:** `cd Backend && npm install && npm run dev`
3. **Frontend:** `cd Frontend && npm install && npm start`
4. Open `http://localhost:3000`

The application includes all required features: registration/login, JWT authentication, full CRUD operations, task status toggle, search, filter, pagination, and a clean responsive UI.